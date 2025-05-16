import { zodParse } from "../middlewares/validationMiddleware";
import { db } from "../db";
import { addressesTable, createAddressSchema } from "../db/addresses";
import { eq, and } from "drizzle-orm";

const AddressSerializer = require("../serializers/addresses");

export async function create(address: any, tx: any) {

    // For now, we just allow one address per user
    if(address.parent_type == 'user') {
        const addressExists = await count( "user", address.parent_id);
        if(addressExists)
            return {error: "Operation not allowed"}
    }

    const {error} = zodParse(createAddressSchema, address);
    if(error) 
        return {error: error};

    try {
        const [addressRow] = await (tx ? tx : db).insert(addressesTable)
        .values(address)
        .returning()

        return AddressSerializer.addressObj(addressRow);
    } catch (error) {
        
        return {error: error};
    }
    
};

export async function createUserAddress(user_id, address: any, tx: any) {

    // For now, we just allow one address per user
    if(address.parent_type == 'user') {
        const addressExists = await count( "user", address.parent_id);
        if(addressExists)
            return {error: "Operation not allowed"}
        
        // Making sure a user only adds their own address
        address = {
            ...address,
            parent_id: user_id
        }
    }

    const {error} = zodParse(createAddressSchema, address);
    if(error) 
        return {error: error};

    try {
        const [addressRow] = await (tx ? tx : db).insert(addressesTable)
        .values(address)
        .returning()

        return AddressSerializer.addressObj(addressRow);
    } catch (error) {
        
        return {error: error};
    }
    
};

export async function getUserAddress(user_id: number) {

    const address = await db.query.addressesTable.findFirst({
        where: and(
            eq(addressesTable.parent_id, user_id),
            eq(addressesTable.parent_type, "user")
        )
    });

    if(!address)
        return {};

    return AddressSerializer.addressObj(address);
};

export async function update(id: number, address: any, tx: any) {

    try {

        var [addressRow] = await (tx ? tx : db).update(addressesTable)
            .set({
                address1: address["address1"],
                address2: address["address2"],
                address3: address["address3"],
                city: address["city"],
                state: address["state"],
                country: address["country"],
                postcode: address["postcode"]
            })
            .where(eq(addressesTable.id, id))
            .returning();
        
        if(!addressRow)
            throw {error: "Address not found!"};

        return AddressSerializer.addressObj(addressRow);
    } catch (error) {

        return {error: error};
    }
    
};

export async function count(parent_type: string, parent_id: string) {

    try {
        
        const count = await db.$count(addressesTable, 
            and(
                eq(addressesTable.parent_type, parent_type),
                eq(addressesTable.parent_id, parent_id)
            ));

        return count;
    } catch (error) {
        
        return {error: error};
    }
};