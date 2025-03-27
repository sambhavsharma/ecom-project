import { defineConfig } from 'drizzle-kit';

const env = process.env.ENV as string;
const host = process.env.DATABASE_HOST as string;
const port = process.env.DATABASE_PORT as unknown as number;
const user = process.env.DATABASE_USER as string;
const password = process.env.DATABASE_PASSWORD as string;
const db = process.env.DATABASE_DB as string;

export default defineConfig({
  out: './drizzle',
  schema: [
    './src/db/productsSchema.ts',
    './src/db/usersSchema.ts'
  ],
  dialect: 'postgresql',
  dbCredentials: {
    host: host,
    port:  port,
    database: db,
    user: user,
    password: password,
    ssl: env == "dev" ? false : true
  },
});
