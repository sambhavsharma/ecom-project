import { ConsoleLogWriter } from "drizzle-orm";

const Media = require("../models/media");

export async function productObj(product: any) {
    
    const media = await Media.get(product.id, "product");
    
    return {
       name: product.name,
       description: product.description,
       currency: product.currency,
       price: product.price,
       media: media
    }
}