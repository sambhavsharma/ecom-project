import { 
    integer, 
    pgTable, 
    varchar, 
    doublePrecision, 
    timestamp 
} from "drizzle-orm/pg-core";
import {createInsertSchema, createUpdateSchema} from "drizzle-zod";
import { usersTable } from "./usersSchema";
import { productsTable } from "./productsSchema";

export const ordersTable = pgTable("orders", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    status: varchar().notNull().default('new'),
    user_id: integer().references(() => usersTable.id).notNull(),    
    price: doublePrecision().notNull(),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())

});

export const orderProductsTable = pgTable("order_products", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    order_id: integer().references(() => ordersTable.id).notNull(),
    product_id: integer().references(() => productsTable.id).notNull(),
    price: doublePrecision().notNull(),
    quantity: integer().notNull().default(1), 
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())

});


export const createOrderSchema = createInsertSchema(ordersTable).strict();
export const updateOrderSchema = createUpdateSchema(ordersTable).strict();