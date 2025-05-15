import { db } from "../db";
import { categoriesTable } from "../db/categories";
import { eq, and } from "drizzle-orm";
import * as _ from "lodash";

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

export async function getCategoryMap() {

    const categories = await db.query.categoriesTable.findMany({
        columns: {
            id: true,
            name: true,
            code: true,
            category_type: true,
            parent_category_id: true
        },
        where: and(
            eq(categoriesTable.is_deleted, false)
        )
    });

    let categoryTypeMap = _.groupBy(categories, 'category_type');
    let categoryParentMap = _.groupBy(categoryTypeMap.Category, 'parent_category_id');
    let subcategoryParentMap = _.groupBy(categoryTypeMap.Subcategory, 'parent_category_id');

    let categoryMap = {
        "department": Object.fromEntries(categoryTypeMap.Department.map((department) => [department.id, department])),
        "category":  _.mapValues(categoryParentMap, innerArray => _.keyBy(innerArray, 'id')),
        "subcategory": _.mapValues(subcategoryParentMap, innerArray => _.keyBy(innerArray, 'id'))
    }

    return categoryMap;
}