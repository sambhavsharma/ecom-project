import { 
    integer, 
    pgTable, 
    varchar, 
    doublePrecision, 
    text, 
    boolean, 
    timestamp 
} from "drizzle-orm/pg-core";
import {createUpdateSchema} from "drizzle-zod";
import { z } from "zod";
import { relations } from 'drizzle-orm';
import { mediaTable } from "./media";

const CURRENCY = ["INR", "USD", "EUR", "AED", "SGD", "AUD", "GBP"] as const;

export const productsTable = pgTable("products", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    seller_id: varchar({ length: 255 }).notNull(),
    currency: varchar({ length: 3 }).notNull(),
    price: doublePrecision().notNull(),
    is_deleted: boolean().default(false),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())

});

export const productRelations = relations(productsTable, ({ many }) => ({
	media: many(mediaTable, {
        fields: [mediaTable.parent_id],
        references: [productsTable.id]
    }),
}));

export const createProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    seller_id: z.string(),
    currency: z.enum(CURRENCY),
    price: z.number(),
    media: z.object({}).array().optional()
});

//export const createProductSchema = createInsertSchema(productsTable).strict();
export const updateProductSchema = createUpdateSchema(productsTable).strict();