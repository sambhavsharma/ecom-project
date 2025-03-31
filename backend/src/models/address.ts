import { zodParse } from "../middlewares/validationMiddleware";
import { db } from "../db";
import { addressesTable, createAddressSchema } from "../db/addresses";

const AddressSerializer = require("../serializers/addresses");

export async function create(address: any, tx: any) {

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