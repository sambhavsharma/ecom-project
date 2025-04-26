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
import { usersTable } from "./users";
import { categoriesTable } from "./categories";
import { productAttributesTable } from "./product_attributes";

const CURRENCY = ["INR", "USD", "EUR", "AED", "SGD", "AUD", "GBP"] as const;
const CONDITION = ["new", "like_new", "gently_used"] as const;
const STATUS = ["draft", "live"] as const;

export const productsTable = pgTable("products", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    status: varchar({ length: 20 }).default("draft").notNull(),
    brand: varchar({ length: 100 }),
    seller_id: integer().notNull(),
    category_id: integer().notNull(),
    condition: varchar({ length: 20 }).notNull(),
    currency: varchar({ length: 3 }).notNull(),
    price: doublePrecision().notNull(),
    is_deleted: boolean().default(false).notNull(),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())
});

export const productRelations = relations(productsTable, ({ many, one }) => ({
	media: many(mediaTable),
    category: one(categoriesTable, {
        fields: [productsTable.category_id],
        references: [categoriesTable.id]
    }),
    attributes: many(productAttributesTable),
    seller: one(usersTable, {
        fields: [productsTable.seller_id],
        references: [usersTable.id]
    })
}));

export const createProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    status: z.enum(STATUS).optional(),
    brand: z.string().optional(),
    condition:  z.enum(CONDITION),
    seller_id: z.number(),
    category_id: z.number(),
    currency: z.enum(CURRENCY),
    price: z.number(),
    media: z.object({}).array().optional()
});

export const updateProductSchema = createUpdateSchema(productsTable).strict();