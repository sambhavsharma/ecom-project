import { zodParse } from "../middlewares/validationMiddleware";
import { db } from "../db";
import { productAttributesTable, createProductAttributesSchema } from "../db/product_attributes";
import { eq, and } from "drizzle-orm";

const ProductAttributesSerializer = require("../serializers/product_attributes");

export async function create(product_attribute: any, tx: any) {

    const {error} = zodParse(createProductAttributesSchema, product_attribute);
    if(error) 
        return {error: error};

    try {
        const [productAttributeRow] = await (tx ? tx : db).insert(productAttributesTable)
        .values(product_attribute)
        .returning()

        return ProductAttributesSerializer.productAttributeObj(productAttributeRow);
    } catch (error) {
        
        return {error: error};
    }
    
};