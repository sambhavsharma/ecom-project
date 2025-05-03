import { 
    integer, 
    pgTable, 
    varchar, 
    doublePrecision, 
    timestamp 
} from "drizzle-orm/pg-core";
import { createUpdateSchema} from "drizzle-zod";
import { z } from "zod";
import { relations } from 'drizzle-orm';

import { usersTable } from "./users";
import { orderProductsTable } from "./order_products";

const CURRENCY = ["INR", "USD", "EUR", "AED", "SGD", "AUD", "GBP"] as const;
const STATUS = ["new","cancelled","sent"] as const;


export const ordersTable = pgTable("orders", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    status: varchar().notNull().default('new'),
    user_id: integer().references(() => usersTable.id).notNull(),    
    price: doublePrecision().notNull(),
    currency: varchar({ length: 3 }).notNull(),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())
});

export const orderRelations = relations(ordersTable, ({ many }) => ({
    products: many(orderProductsTable),
}));

export const createOrderSchema = z.object({
    status: z.enum(STATUS),
    user_id: z.number(),
    price: z.number(),
    currency: z.enum(CURRENCY)
});;
export const updateOrderSchema = createUpdateSchema(ordersTable).strict();