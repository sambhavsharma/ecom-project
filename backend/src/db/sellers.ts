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

export const sellersTable = pgTable("sellers", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    first_name: varchar({ length: 255 }).notNull(),
    last_name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).unique().notNull(),
    phone:  varchar({ length: 50 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    is_deleted: boolean().default(false),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())

});

export const createSellersSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone:  z.string(),
    password: z.string(),
    addresses: z.object({}).array().optional()
}).strict();

export const updateSellersSchema = createUpdateSchema(sellersTable).strict();