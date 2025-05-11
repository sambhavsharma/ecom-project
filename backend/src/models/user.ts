import { db } from "../db";
import { usersTable } from "../db/users";
import { eq, and } from "drizzle-orm";
import fs from 'fs';
import {getHashedPassword} from "../lib/auth/password";

const UserSerializer = require("../serializers/users");
const Address = require("../models/address");
const Media = require("../models/media");

const BASE_URL = "http://127.0.0.1:3000/";

export async function create(user: any) {

    user.password =  await getHashedPassword(user.password)

    if(user.dob)
        user.dob = new Date(user.dob);
        
    const {userRow, error} = await db.transaction(async (tx) => { 
        var [userRow] = await tx.insert(usersTable)
            .values(user)
            .returning();

        for (var address of user.addresses || []) {
            address.parent_type = "user";
            address.parent_id = userRow.id.toString();
            const {error} = await Address.create(address, tx);
            if (error) {
                tx.rollback();
                return {error};
            }
        }
        
        return {userRow: userRow};
    });

    if(userRow)
        return UserSerializer.userObj(userRow);
    else 
        return {error};
};

export async function findOrCreate(user: any) {

    const {userRow, error} = await db.transaction(async (tx) => { 

        let updateQuery = {};
        if(user.email_verified)
            updateQuery["email_verified"] = true;

        var [userRow] = await tx.insert(usersTable)
            .values(user)
            .onConflictDoUpdate({
                target: usersTable.email,
                set: updateQuery,
            })
            .returning();
        
        if(user.image) {
    
            var mediaObj = {
                parent_type: "user",
                parent_id: userRow.id.toString(),
                type: "image",
                url: user.image.url
            }

            const mediaExists = await Media.count("image", "user", userRow.id);
            let queryResponse;

            if(mediaExists === 0)
                queryResponse = await Media.create(mediaObj, tx);
            // else
            //     queryResponse = await Media.update(mediaObj, tx);

            if (queryResponse && queryResponse.error) {
                console.log(queryResponse);
                tx.rollback();  
                return { error: queryResponse.error};
            }

            userRow["image"] = queryResponse || user.image;
        }

        
        return {userRow: userRow};
    });

    if(userRow)
        return UserSerializer.userObj(userRow);
    else 
        return {error};
};

export async function get(id: number) {

    const user = await db.query.usersTable.findFirst({
        where: and(
            eq(usersTable.id, id),
            eq(usersTable.is_deleted, false)
        ),
        with: { 
            media: {
                where: (media, { eq }) => eq(media.parent_type, "user")
            }
        }
    });

    return UserSerializer.userDetailsObj(user);
}

export async function getSeller(id: number) {

    const user = await db.query.usersTable.findFirst({
        where: and(
            eq(usersTable.id, id),
            eq(usersTable.is_deleted, false)
        ),
        with: { 
            media: {
                where: (media, { eq }) => eq(media.parent_type, "user")
            }
        }
    });

    return UserSerializer.sellerObj(user);
}

export async function update(id: number, user: any) {

    const {userRow, error} = await db.transaction(async (tx) => { 

        var [userRow] = await tx.update(usersTable)
            .set({
                first_name: user["first_name"],
                last_name: user["last_name"],
                bio: user["bio"]
            })
            .where(eq(usersTable.id, id))
            .returning();
        
        if(user.image) {
            
            if(!user.image.url){
                let buff = Buffer.from(user.image.base64, 'base64');
                fs.writeFileSync('./media/'+user.image.fileName, buff);
            }

            var mediaObj = {
                parent_type: "user",
                parent_id: id.toString(),
                type: user.image.type || "image",
                url: user.image.url ? user.image.url : BASE_URL+user.image.fileName
            }

            const mediaExists = await Media.count("image", "user", id);
            let queryResponse;

            // We are updating image here unnecessarily, even if the image itself is not updated
            // So, this needs to be fixed, either in the backend or in the frontend or both
            if(mediaExists === 0)
                queryResponse = await Media.create(mediaObj, tx);
            else
                queryResponse = await Media.update(mediaObj, tx);

            if (queryResponse.error) {
                // console.log(queryResponse);
                tx.rollback();  
                return { error: queryResponse.error};
            }

            userRow["image"] = queryResponse;
        }

        return {userRow: userRow};
    });

    if(userRow)
        return UserSerializer.userObj(userRow);
    else 
        return {error};
};
