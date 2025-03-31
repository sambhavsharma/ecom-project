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

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    first_name: varchar({ length: 255 }).notNull(),
    last_name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).unique().notNull(),
    phone:  varchar({ length: 50 }).notNull(),
    dob: date({mode: "date"}),
    password: varchar({ length: 255 }).notNull(),
    is_deleted: boolean().default(false),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp({}).$onUpdate(() => new Date())

});

//export const createUserSchema = createInsertSchema(usersTable).strict();
export const createUserSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone:  z.string(),
    dob: z.string().date(),
    password: z.string(),
    addresses: z.object({}).array().optional()
}).strict();

//createUserSchema.transform((user) => new Date(user.dob));
export const updateUserSchema = createUpdateSchema(usersTable).strict();