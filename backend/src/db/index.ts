import { drizzle } from 'drizzle-orm/node-postgres';

import * as mediaSchema from './media';
import * as productsSchema from './products';
import * as usersSchema  from './users';
import * as ordersSchema  from './orders';
import * as addressesSchema  from './addresses';
import * as categoriesSchema  from './categories';

const env = process.env.ENV as string;
const host = process.env.DATABASE_HOST as string;
const port = process.env.DATABASE_PORT as unknown as number;
const user = process.env.DATABASE_USER as string;
const password = process.env.DATABASE_PASSWORD as string;
const dbase = process.env.DATABASE_DB as string;

export const db = drizzle({
  schema: { 
    ...mediaSchema, 
    ...productsSchema, 
    ...usersSchema, 
    ...addressesSchema,
    ...ordersSchema,
    ...categoriesSchema,
  }, 
  logger: false,
  connection: { 
    host: host,
    port:  port,
    database: dbase,
    user: user,
    password: password,
    ssl: env == "dev" ? false : true
  }
});


