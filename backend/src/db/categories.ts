import { 
    integer, 
    pgTable, 
    varchar, 
    boolean, 
    timestamp,
    unique
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { relations } from 'drizzle-orm';

import { categoryAttributesTable } from "./category_attributes";

export const categoriesTable = pgTable("categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    code: varchar({ length: 255 }).notNull(),
    parent_category_id: integer(),
    is_deleted: boolean().default(false).notNull(),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())
}, (t) => [
    unique().on(t.parent_category_id, t.name),
    unique().on(t.parent_category_id, t.code)
]);

export const categoriesRelations = relations(categoriesTable, ({ one, many }) => ({
	parent: one(categoriesTable, {
		fields: [categoriesTable.parent_category_id],
		references: [categoriesTable.id],
        relationName: 'parent'
	}),
    attributes: many(categoryAttributesTable)
}));

export const createCategorySchema = z.object({
    name: z.string(),
    parent_category_id: z.number().optional()
});
