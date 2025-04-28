// @ts-nocheck
import { db } from "../db";
import { productsTable } from "../db/products";
import { eq, and } from "drizzle-orm";
import multer from "multer";
import fs from 'fs';

const ProductSerializer = require("../serializers/products");
const Media = require("../models/media");
const ProductAttribute = require("../models/product_attribute");
const Storage = require("../lib/multer-config");

const BASE_URL = "http://127.0.0.1:3000/";

export async function create(product: any) {
        
    const {productRow, error} = await db.transaction(async (tx) => { 

        var [productRow] = await tx.insert(productsTable)
            .values(product)
            .returning();

        // Adding Product Media
        productRow.media = [];
        
        for (var media of product.media || []) {

            if(!media.url){
                let buff = Buffer.from(media.uri, 'base64');
                fs.writeFileSync('./media/'+media.fileNname, buff);
            }
                
            var mediaObj = {
                parent_type: "product",
                parent_id: productRow.id.toString(),
                type: media.type,
                url: media.url ? media.url : BASE_URL+media.fileNname
            }

            productRow.media.push(mediaObj);

            const {error} = await Media.create(mediaObj, tx);
            
            if (error) {
                tx.rollback();  
                return {error};
            }
        }

        // Adding Product Attributes
        for (var attribute_id of Object.keys(product.attributes) || []) {
            let attribute = {
                product_id: productRow.id,
                attribute_id: parseInt(attribute_id),
                value: product.attributes[attribute_id]
            }

            const {error} = await ProductAttribute.create(attribute, tx);

            if (error) {
                console.log(error);
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
            },
            category: true,
            attributes: {
                with: {
                    attribute: true
                }
            },
            seller: {
                with: {
                    media: {
                        where: (media, { eq }) => eq(media.parent_type, "user")
                    }
                }
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
            },
            category: true,
            seller: {
                with: {
                    media: {
                        where: (media, { eq }) => eq(media.parent_type, "user")
                    }
                }
            }
        }
    });
    
    return ProductSerializer.productsList(products);
}

export const conditionMap = {
    "N": "New",
    "LN": "Like New",
    "GU": "Gently Used"
};
