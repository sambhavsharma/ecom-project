import { 
    integer, 
    pgTable, 
    varchar, 
    doublePrecision, 
    timestamp 
} from "drizzle-orm/pg-core";
import {createInsertSchema, createUpdateSchema} from "drizzle-zod";
import { usersTable } from "./users";

const CURRENCY = ["INR", "USD", "EUR", "AED", "SGD", "AUD", "GBP"] as const;

export const ordersTable = pgTable("orders", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    status: varchar().notNull().default('new'),
    user_id: integer().references(() => usersTable.id).notNull(),    
    price: doublePrecision().notNull(),
    currency: varchar({ length: 3 }).notNull(),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())
});


export const createOrderSchema = createInsertSchema(ordersTable).strict();
export const updateOrderSchema = createUpdateSchema(ordersTable).strict();