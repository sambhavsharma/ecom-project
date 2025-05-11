import { db } from "../db";
import { categoriesTable } from "../db/categories";
import { eq, and, isNotNull } from "drizzle-orm";

const CategoriesSerializer = require("../serializers/categories");

export async function list(limit: number, offset: number) {

    const categories = await db.query.categoriesTable.findMany({
        where: and(
            eq(categoriesTable.is_deleted, false),
            //isNotNull(categoriesTable.parent_category_id)
        ),
        limit: limit,
        offset: offset,
        with: { 
            parent: true,
            attributes: {
                with: {
                    attribute: true
                }
            }
        }
    });
    
    return CategoriesSerializer.categoriesList(categories);
}

export async function listMenu() {

    const categories = await db.query.categoriesTable.findMany({
        where: and(
            eq(categoriesTable.is_deleted, false)
        ),
        with: { 
            parent: true
        }
    });
    
    return CategoriesSerializer.categoriesMenu(categories);
}