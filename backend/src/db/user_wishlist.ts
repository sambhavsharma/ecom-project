import { 
    integer, 
    pgTable, 
    varchar, 
    boolean, 
    timestamp,
    date 
} from "drizzle-orm/pg-core";
import {createUpdateSchema} from "drizzle-zod";
import { z } from "zod";

import { usersTable } from "./users";
import { productsTable } from "./products";

export const userWishlistTable = pgTable("user_wishlist", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer().references(() => usersTable.id).notNull(),    
    product_id: integer().references(() => productsTable.id).notNull(),    
    is_deleted: boolean().default(false).notNull(),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())

});

export const createUserWishlistSchema = z.object({
    user_id: z.number(),
    product_id: z.number()
}).strict();

export const updateUserSchema = createUpdateSchema(userWishlistTable).strict();