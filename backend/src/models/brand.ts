import { zodParse } from "../middlewares/validationMiddleware";
import { db } from "../db";
import { brandsTable, createBrandSchema } from "../db/brands";
import { eq, and, ilike, asc } from "drizzle-orm";

const BrandSerializer = require("../serializers/brands");

export async function create(brand: any) {

    const {error} = zodParse(createBrandSchema, brand);
    if(error) 
        return {error: error};

    try {
        const [brandRow] = await db.insert(brandsTable)
        .values(brand)
        .returning()

        return BrandSerializer.brandObj(brandRow);
    } catch (error) {
        
        return {error: error};
    }
    
};

export async function list(query: any, limit: number) {

    const whereQuery = {
        where: and(
            eq(brandsTable.is_deleted, false),
            query.query ? ilike(brandsTable.name, `${query.query}%`) : eq(1,1)
        )
    }

    const brands = await db.query.brandsTable.findMany({
        ...whereQuery,
        limit: limit,
        with: { 
            media: {
                where: (media, { eq }) => eq(media.parent_type, "brand")
            }
        },
        orderBy: [asc(brandsTable.name)]
    });

    return BrandSerializer.brandsList(brands);
    
};
