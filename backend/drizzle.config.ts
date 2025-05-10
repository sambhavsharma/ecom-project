import { defineConfig } from 'drizzle-kit';

const env = process.env.ENV as string;
const host = process.env.DATABASE_HOST as string;
const port = process.env.DATABASE_PORT as unknown as number;
const user = process.env.DATABASE_USER as string;
const password = process.env.DATABASE_PASSWORD as string;
const db = process.env.DATABASE_DB as string;

export default defineConfig({
  out: './src/db/drizzle/migrations',
  schema: [
    './src/db/users.ts',
    './src/db/addresses.ts',
    './src/db/products.ts',
    './src/db/media.ts',
    './src/db/auth_tokens.ts',
    './src/db/sellers.ts',
    './src/db/categories.ts',
    './src/db/attributes.ts',
    './src/db/category_attributes.ts',
    './src/db/product_attributes.ts',
    './src/db/product_categories.ts',
    './src/db/favorites.ts',
    './src/db/cart_items.ts',
    './src/db/orders.ts',
    './src/db/order_products.ts',
    './src/db/brands.ts',
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
