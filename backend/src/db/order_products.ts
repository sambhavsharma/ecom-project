import { 
    integer, 
    pgTable, 
    varchar, 
    doublePrecision, 
    timestamp 
} from "drizzle-orm/pg-core";
import {createInsertSchema, createUpdateSchema} from "drizzle-zod";
import { productsTable } from "./products";
import { ordersTable } from "./orders";
const CURRENCY = ["INR", "USD", "EUR", "AED", "SGD", "AUD", "GBP"] as const;

export const orderProductsTable = pgTable("order_products", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    order_id: integer().references(() => ordersTable.id).notNull(),
    product_id: integer().references(() => productsTable.id).notNull(),
    price: doublePrecision().notNull(),
    currency: varchar({ length: 3 }).notNull(),
    quantity: integer().notNull().default(1), 
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())

});


export const createOrderSchema = createInsertSchema(ordersTable).strict();
export const updateOrderSchema = createUpdateSchema(ordersTable).strict();