import { 
    integer, 
    pgTable, 
    varchar, 
    doublePrecision, 
    text, 
    boolean, 
    timestamp 
} from "drizzle-orm/pg-core";
import {createInsertSchema, createUpdateSchema} from "drizzle-zod";

export const productsTable = pgTable("products", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    image: varchar({ length: 255 }).notNull(),
    price: doublePrecision().notNull(),
    is_deleted: boolean().default(false),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())

});

export const createProductSchema = createInsertSchema(productsTable).strict();
export const updateProductSchema = createUpdateSchema(productsTable).strict();