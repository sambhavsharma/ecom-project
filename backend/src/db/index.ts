import { drizzle } from 'drizzle-orm/node-postgres';

import * as mediaSchema from './media';
import * as productsSchema from './products';
import * as usersSchema  from './users';
import * as ordersSchema  from './orders';
import * as addressesSchema  from './addresses';
import * as categoriesSchema  from './categories';
import * as attributesSchema  from './attributes';
import * as categoryAttributesSchema  from './category_attributes';
import * as productAttributesSchema  from './product_attributes';
import * as favoritesSchema  from './favorites';

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
    ...attributesSchema,
    ...categoryAttributesSchema,
    ...productAttributesSchema,
    ...favoritesSchema
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


