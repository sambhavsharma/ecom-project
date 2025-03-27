import { drizzle } from 'drizzle-orm/node-postgres';

const env = process.env.ENV as string;
const host = process.env.DATABASE_HOST as string;
const port = process.env.DATABASE_PORT as unknown as number;
const user = process.env.DATABASE_USER as string;
const password = process.env.DATABASE_PASSWORD as string;
const dbase = process.env.DATABASE_DB as string;

export const db = drizzle({ 
  connection: { 
    host: host,
    port:  port,
    database: dbase,
    user: user,
    password: password,
    ssl: env == "dev" ? false : true
  }
});


