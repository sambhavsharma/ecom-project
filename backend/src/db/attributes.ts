import { sql } from 'drizzle-orm';
import { 
    integer, 
    pgTable, 
    varchar, 
    boolean, 
    timestamp,
    text
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { relations } from 'drizzle-orm';

import { categoryAttributesTable } from "./category_attributes";

export const attributesTable = pgTable("attributes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    code: varchar({ length: 255 }).notNull(),
    values: text().array().notNull().default(sql`ARRAY[]::text[]`),
    default_value: varchar({ length: 255 }),
    is_deleted: boolean().default(false),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())

});

export const attributesRelations = relations(attributesTable, ({ many }) => ({
    categories: many(categoryAttributesTable)
}));

export const createAttributeSchema = z.object({
    name: z.string(),
    parent_category_id: z.number().optional()
});
