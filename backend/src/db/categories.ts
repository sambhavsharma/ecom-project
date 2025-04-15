import { 
    integer, 
    pgTable, 
    varchar, 
    boolean, 
    timestamp
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { relations } from 'drizzle-orm';

import { categoryAttributesTable } from "./category_attributes";

export const categoriesTable = pgTable("categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).unique().notNull(),
    parent_category_id: integer(),
    is_deleted: boolean().default(false).notNull(),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())

});

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
