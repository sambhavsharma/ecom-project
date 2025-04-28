import { zodParse } from "../middlewares/validationMiddleware";
import { db } from "../db";
import { mediaTable, createMediaSchema } from "../db/media";
import { eq, and } from "drizzle-orm";

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
        console.log(error);
        return {error: error};
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