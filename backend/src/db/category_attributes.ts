import { 
    integer, 
    pgTable, 
    varchar, 
    boolean, 
    timestamp
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { attributesTable } from "./attributes";
import { categoriesTable } from "./categories";

export const categoryAttributesTable = pgTable("category_attributes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    category_id: integer().references(() => categoriesTable.id).notNull(),
    attribute_id: integer().references(() => attributesTable.id).notNull(),
    is_deleted: boolean().default(false).notNull(),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())

});

export const createCategoryAttributeSchema = z.object({
    category_id: z.string(),
    attribute_id: z.number()
});
