import { db } from "../db";
import { productsTable } from "../db/products";
import { eq, and } from "drizzle-orm";

const ProductSerializer = require("../serializers/products");
const Media = require("../models/media");

export async function create(product: any) {
        
    const {productRow, error} = await db.transaction(async (tx) => { 
        var [productRow] = await tx.insert(productsTable)
            .values(product)
            .returning();

        for (var media of product.media || []) {
            media.parent_type = "product";
            media.parent_id = productRow.id.toString();
            const {error} = await Media.create(media, tx);
            if (error) {
                tx.rollback();
                return {error};
            }
        }
        
        return {productRow: productRow};
    });

    if(productRow)
        return ProductSerializer.productObj(productRow);
    else 
        return {error};
};

export async function get(id: number) {

    const product = await db.query.productsTable.findFirst({
        where: and(
            eq(productsTable.id, id),
            eq(productsTable.is_deleted, false)
        ),
        with: { 
            media: {
                where: (media, { eq }) => eq(media.parent_type, "product")
            }
        }
    });
        
    return ProductSerializer.productObj(product);
}

export async function list(limit: number, offset: number) {

    const products = await db.query.productsTable.findMany({
        where: and(
            eq(productsTable.is_deleted, false)
        ),
        limit: limit,
        offset: offset,
        with: { 
            media: {
                where: (media, { eq }) => eq(media.parent_type, "product")
            }
        }
    });
    
    return ProductSerializer.productsList(products);
}