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

const PARENT_TYPES = ["product"] as const;
const TYPES = ["image", "video"] as const;

export const mediaTable = pgTable("media", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    url: varchar({ length: 255 }).notNull(),
    type: varchar({ length: 255 }),
    parent_id: integer().notNull(),
    parent_type: varchar({ length: 20 }).notNull(),
    is_deleted: boolean().default(false).notNull(),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())

});

export const mediaRelations = relations(mediaTable, ({ one }) => ({
	product: one(productsTable, {
        fields: [mediaTable.parent_id],
        references: [productsTable.id]
    }),
}));

export const createMediaSchema = z.object({
    url: z.string(),
    type: z.enum(TYPES),
    parent_id: z.string(),
    parent_type:  z.enum(PARENT_TYPES)
});
