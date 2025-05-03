import { 
    integer, 
    pgTable, 
    varchar, 
    doublePrecision, 
    timestamp 
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { relations } from 'drizzle-orm';

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

export const orderProductssRelations = relations(orderProductsTable, ({ one }) => ({
	product: one(productsTable, {
        fields: [orderProductsTable.product_id],
        references: [productsTable.id]
    }),
    order: one(ordersTable, {
        fields: [orderProductsTable.order_id],
        references: [ordersTable.id]
    }),
}));

export const createOrderProductSchema =  z.object({
    order_id: z.number(),
    product_id: z.number(),
    price: z.number(),
    currency: z.enum(CURRENCY),
    quantity:  z.number()
});