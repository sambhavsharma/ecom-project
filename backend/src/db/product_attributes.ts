import { 
    integer, 
    pgTable, 
    varchar, 
    boolean, 
    timestamp
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { relations } from 'drizzle-orm';

import { productsTable } from "./products";
import { attributesTable } from "./attributes";

export const productAttributesTable = pgTable("product_attributes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    attribute_id: integer().references(() => attributesTable.id).notNull(),
    product_id: integer().references(() => productsTable.id).notNull(),
    value: varchar({ length: 255 }).notNull(),
    is_deleted: boolean().default(false).notNull(),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())
});

export const productAttributesRelations = relations(productAttributesTable, ({ one }) => ({
	attribute: one(attributesTable, {
        fields: [productAttributesTable.attribute_id],
        references: [attributesTable.id]
    }),
    product: one(productsTable, {
        fields: [productAttributesTable.product_id],
        references: [productsTable.id]
    }),
}));

export const createProductAttributesSchema = z.object({
    attribute_id: z.number(),
    product_id: z.number(),
    value: z.string()
});
