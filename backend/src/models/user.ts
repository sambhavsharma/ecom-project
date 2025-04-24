import { db } from "../db";
import { usersTable } from "../db/users";
import crypto from "crypto";

const UserSerializer = require("../serializers/users");
const Address = require("../models/address");

const DEFAULT_LIMIT = 10;
const HASH_FUNCTION = 'sha512';

export async function create(user: any) {

    //var salt = crypto.randomBytes(16);
    var salt = "";

    var hashedPassword = crypto.pbkdf2Sync(user.password, salt, 100000, 64, HASH_FUNCTION);
    user.password = hashedPassword.toString('hex');

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