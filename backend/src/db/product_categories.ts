import { 
    integer, 
    pgTable, 
    varchar, 
    boolean, 
    timestamp
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { productsTable } from "./products";
import { categoriesTable } from "./categories";

export const productCategoriesTable = pgTable("product_categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    category_id: integer().references(() => categoriesTable.id).notNull(),
    product_id: integer().references(() => productsTable.id).notNull(),
    is_deleted: boolean().default(false).notNull(),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())

});

export const createProductCategoriesTableSchema = z.object({
    category_id: z.string(),
    product_id: z.number()
});
