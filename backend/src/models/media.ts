import { zodParse } from "../middlewares/validationMiddleware";
import { db } from "../db";
import { mediaTable, createMediaSchema } from "../db/media";
import { eq, and, notInArray} from "drizzle-orm";
import { PRODUCT_CONDITIONS, DEFAULT_LIMIT, BASE_URL } from "../lib/constants";
import fs from 'fs';

const MediaSerializer = require("../serializers/media");

export async function create(media: any, tx: any) {

    const {error} = zodParse(createMediaSchema, media);
    if(error) 
        return {error: error};

    try {
        const [mediaRow] = await (tx ? tx : db).insert(mediaTable)
        .values(media)
        .returning()

        return MediaSerializer.mediaObj(mediaRow);
    } catch (error) {
        
        return {error: error};
    }
    
};

export async function update(media: any, tx: any) {

    const {error} = zodParse(createMediaSchema, media);
    if(error) 
        return {error: error};

    try {
        const [mediaRow] = await (tx ? tx : db).update(mediaTable)
        .set({ url: media.url })
        .where(
            and(
                eq(mediaTable.type, media.type),
                eq(mediaTable.parent_type, media.parent_type),
                eq(mediaTable.parent_id, media.parent_id)
            )
        )
        .returning()

        return MediaSerializer.mediaObj(mediaRow);
    } catch (error) {
 
        throw error;
    }
    
};

export async function count(type: string, parent_type: string, parent_id: string,) {

    try {
        
        const count = await db.$count(mediaTable, 
            and(
                eq(mediaTable.type, type),
                eq(mediaTable.parent_type, parent_type),
                eq(mediaTable.parent_id, parent_id)
            ));

        return count;
    } catch (error) {
        
        return {error: error};
    }
}

export async function get(parent_id: string, parent_type: string) {

    try {
        
        const media = await db.query.mediaTable.findMany({
            where: and(
                eq(mediaTable.parent_id, parent_id),
                eq(mediaTable.parent_type, parent_type)
            )
        });

        return MediaSerializer.mediaList(media);
    } catch (error) {
        
        console.log(error);
        return {error: error};
    }
}

export async function removeProductMediaByNotIds(product_id, mediaIds: [], tx: any) {

    try {
        const mediaRows = await (tx ? tx : db).update(mediaTable)
        .set({ is_deleted: true })
        .where(
            and(
                notInArray(mediaTable.id, mediaIds),
                eq(mediaTable.parent_type, "product"),
                eq(mediaTable.parent_id, product_id),
                eq(mediaTable.is_deleted, false)
            )
        )
        .returning()

        return MediaSerializer.mediaList(mediaRows);
    } catch (error) {
        tx.rollback();  
        throw error;
    }
}

export async function createProductMediaFromList(product_id, mediaList, tx: any) {
    let createdMedia = [];
    for (var media of mediaList || []) {
    
        if(!media.url){
            let buff = Buffer.from(media.base64, 'base64');
            fs.writeFileSync('./media/'+media.fileName, buff);
        }
            
        var mediaObj = {
            parent_type: "product",
            parent_id: product_id.toString(),
            type: media.type,
            url: media.url ? media.url : BASE_URL+media.fileName
        }

        const createdMediaObj = await create(mediaObj, tx);
        createdMedia.push(createdMediaObj);
        if (!createdMediaObj) {
            tx.rollback();  
            throw new Exception('Error creating media!');
        }
    }

    return createdMedia;
}