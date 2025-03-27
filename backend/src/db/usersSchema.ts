import { 
    integer, 
    pgTable, 
    varchar, 
    text, 
    boolean, 
    timestamp 
} from "drizzle-orm/pg-core";
import {createInsertSchema, createUpdateSchema} from "drizzle-zod";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    first_name: varchar({ length: 255 }).notNull(),
    last_name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).unique().notNull(),
    password: varchar({ length: 255 }).notNull(),
    role: varchar({ length: 255 }).notNull().default("user"),
    address: text(),
    is_deleted: boolean().default(false),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())

});

export const createUserSchema = createInsertSchema(usersTable).strict();
export const updateUserSchema = createUpdateSchema(usersTable).strict();