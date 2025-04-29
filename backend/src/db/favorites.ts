import { 
    integer, 
    pgTable, 
    boolean, 
    timestamp,
    unique
} from "drizzle-orm/pg-core";
import {createUpdateSchema} from "drizzle-zod";
import { z } from "zod";
import { relations } from 'drizzle-orm';

import { usersTable } from "./users";
import { productsTable } from "./products";

export const favoritesTable = pgTable("favorites", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer().references(() => usersTable.id).notNull(),    
    product_id: integer().references(() => productsTable.id).notNull(),    
    is_deleted: boolean().default(false).notNull(),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())
}, (t) => [
    unique().on(t.user_id, t.product_id)
]);

export const favoritesRelations = relations(favoritesTable, ({ one }) => ({
	product: one(productsTable, {
        fields: [favoritesTable.product_id],
        references: [productsTable.id]
    })
}));


export const createFavoritesSchema = z.object({
    user_id: z.number(),
    product_id: z.number()
}).strict();

export const updateFavoritesSchema = createUpdateSchema(favoritesTable).strict();