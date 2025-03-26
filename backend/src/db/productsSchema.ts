import { integer, pgTable, varchar, doublePrecision, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("products", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    price: doublePrecision().notNull()
});
