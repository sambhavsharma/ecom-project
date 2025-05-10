import { db } from "./index";
import { brandsTable } from "./brands";
import { productsTable } from "./products";
import { usersTable } from "./users";
import { addressesTable } from "./addresses";
import { mediaTable } from "./media";
import { categoriesTable } from "./categories";
import { attributesTable } from "./attributes";
import { categoryAttributesTable } from "./category_attributes";
import { productAttributesTable } from "./product_attributes";
import { productCategoriesTable } from "./product_categories";
import { sql } from 'drizzle-orm';

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const env = process.env.ENV as string;

async function main() {

    if(env != 'dev') {
        console.log("Not in dev environment");
        return;
    }

    console.log("\n\n Resetting Schema...");
    await db.execute(sql`DROP SCHEMA public CASCADE;\
    CREATE SCHEMA public;\
    GRANT ALL ON SCHEMA public TO postgres;\
    GRANT ALL ON SCHEMA public TO public;`);

    console.log("\n\n Removing Migration...");
    await exec('rm -rf ./src/db/drizzle');

    console.log("\n\n Generating Migration...");
    await exec('npm run db:generate');

    console.log("\n\n Migrating Database...");
    await exec('npm run db:migrate');

    const users = [
        {
            first_name: "Sambhav",
            last_name: "Sharma1",
            email: "sambhav.sharma@hotmail.com",
            phone: "+919711324152",
            password: "password"
        },
        {
            first_name: "Sambhav",
            last_name: "Sharma2",
            email: "sambhav.sharma2@hotmail.com",
            phone: "+919711324152",
            password: "password"
        },
        {
            first_name: "Sambhav",
            last_name: "Sharma3",
            email: "sambhav.sharma3@hotmail.com",
            phone: "+919711324152",
            password: "password"
        },
        {
            first_name: "Sambhav",
            last_name: "Sharma4",
            email: "sambhav.sharma4@hotmail.com",
            phone: "+919711324152",
            password: "password"
        },
        {
            first_name: "Sambhav",
            last_name: "Sharma5",
            email: "sambhav.sharma5@hotmail.com",
            phone: "+919711324152",
            password: "password"
        },
        {
            first_name: "Sambhav",
            last_name: "Sharma6",
            email: "sambhav.sharma6@hotmail.com",
            phone: "+919711324152",
            password: "password"
        },
        {
            first_name: "Sambhav",
            last_name: "Sharma7",
            email: "sambhav.sharma7@hotmail.com",
            phone: "+919711324152",
            password: "password"
        },
        {
            first_name: "Sambhav",
            last_name: "Sharma8",
            email: "sambhav.sharma8@hotmail.com",
            phone: "+919711324152",
            password: "password"
        },
        {
            first_name: "Sambhav",
            last_name: "Sharma9",
            email: "sambhav.sharma9@hotmail.com",
            phone: "+919711324152",
            password: "password"
        },
        {
            first_name: "Sambhav",
            last_name: "SharmaX",
            email: "sambhav.sharma10@hotmail.com",
            phone: "+919711324152",
            password: "password"
        }
    ]

    const addresses = [
        {
            address1: "A-87",
            address2: "Patel Nagar II",
            city: "New Delhi",
            state: "Delhi",
            country: "IN",
            postcode: "201001",
            parent_type: "user",
            parent_id: 1
        }

    ]

    const brands = [
        {
            "name": "Apple",
            "code": "apple"
        },
        {
            "name": "Nike",
            "code": "nike"
        },
        {
            "name": "Dyson",
            "code": "dyson"
        },
        {
            "name": "Samsung",
            "code": "samsung"
        },
        {
            "name": "Tommy Hilfiger",
            "code": "tommyhilfiger"
        },
        {
            "name": "Calvin Klein",
            "code": "calvinklein"
        },
        {
            "name": "Armani",
            "code": "armani"
        },
        {
            "name": "Gucci",
            "code": "gucci"
        },
        {
            "name": "Adidas",
            "code": "adidas"
        },
        {
            "name": "Puma",
            "code": "puma"
        },
        {
            "name": "Sketchers",
            "code": "sketchers"
        },
        {
            "name": "Rado",
            "code": "rado"
        },
        {
            "name": "Roberto Cavalli",
            "code": "robertocavalli"
        },
        {
            "name": "Hermes",
            "code": "hermes"
        },
        {
            "name": "Levis",
            "code": "levis"
        },
        {
            "name": "Boss",
            "code": "boss"
        },
        {
            "name": "Bose",
            "code": "bose"
        },
        {
            "name": "Raymond",
            "code": "raymond"
        },
        {
            "name": "Prada",
            "code": "prada"
        },
        {
            "name": "Gant",
            "code": "gant"
        },
        {
            "name": "Sony",
            "code": "sony"
        }
    ]

    const products = [
        {
            "name": "AirPods Pro",
            "description": "Apple's wireless noise-cancelling earbuds with adaptive transparency and spatial audio.",
            "seller_id": Math.floor(Math.random() * 10)+1,
            "category_id": 1,
            "currency": "INR",
            "brand_id": brands.findIndex(brand => brand.name == 'Apple') + 1,
            "condition": "new",
            "price": 249.99
        },
        {
            "name": "Apple Watch Series 9",
            "description": "Latest smartwatch from Apple featuring always-on retina display and advanced health monitoring.",
            "seller_id": Math.floor(Math.random() * 10)+1,
            "category_id": 1,
            "currency": "INR",
            "brand_id": brands.findIndex(brand => brand.name == 'Apple') + 1,
            "condition": "like_new",
            "price": 399.99
        },
        {
            "name": "Bose Noise Cancelling Headphones",
            "description": "Premium noise-cancelling over-ear headphones with 20 hours of battery life and voice assistant integration.",
            "seller_id": Math.floor(Math.random() * 10)+1,
            "category_id": 2,
            "currency": "INR",
            "brand_id": brands.findIndex(brand => brand.name == 'Bose') + 1,
            "condition": "new",
            "price": 349.99,
            
        },
        {
            "name": "Dyson V15 Vacuum",
            "description": "Powerful cordless vacuum with laser-detect technology and advanced filtration system.",
            "seller_id": Math.floor(Math.random() * 10)+1,
            "category_id": 2,
            "currency": "INR",
            "brand_id": brands.findIndex(brand => brand.name == 'Dyson') + 1,
            "condition": "new",
            "price": 699.99
        },
        {
            "name": "Samsung Galaxy S24 Ultra",
            "description": "Flagship smartphone with 200MP camera, 120Hz AMOLED display, and S Pen support.",
            "seller_id": Math.floor(Math.random() * 10)+1,
            "category_id": 3,
            "currency": "INR",
            "brand_id": brands.findIndex(brand => brand.name == 'Samsung') + 1,
            "condition": "gently_used",
            "price": 1199.99
        },
        {
            "name": "iPad Pro",
            "description": "12.9-inch iPad Pro with M2 chip, Liquid Retina XDR display, and 5G connectivity.",
            "seller_id": Math.floor(Math.random() * 10)+1,
            "category_id": 6,
            "currency": "INR",
            "brand_id": brands.findIndex(brand => brand.name == 'Apple') + 1,
            "condition": "like_new",
            "price": 1099.99
        },
        {
            "name": "iPhone 16 Pro",
            "description": "Apple's latest iPhone with A18 Bionic chip, ProMotion display, and advanced triple-lens camera system.",
            "seller_id": Math.floor(Math.random() * 10)+1,
            "category_id": 6,
            "currency": "INR",
            "brand_id": brands.findIndex(brand => brand.name == 'Apple') + 1,
            "condition": "like_new",
            "price": 1299.99
        },
        {
            "name": "MacBook Pro 16-inch",
            "description": "High-performance laptop with M2 Max chip, Liquid Retina XDR display, and 1TB SSD.",
            "seller_id": Math.floor(Math.random() * 10)+1,
            "category_id": 7,
            "currency": "INR",
            "brand_id": brands.findIndex(brand => brand.name == 'Apple') + 1,
            "condition": "gently_used",
            "price": 2499.99
        },
        {
            "name": "Nike Air Max 270",
            "description": "Popular running shoes with Nike Air cushioning and breathable mesh upper.",
            "seller_id": Math.floor(Math.random() * 10)+1,
            "category_id": 8,
            "currency": "INR",
            "brand_id": brands.findIndex(brand => brand.name == 'Nike') + 1,
            "condition": "new",
            "price": 149.99
        },
        {
            "name": "PlayStation 5",
            "description": "Sony's latest gaming console with 8K output, lightning-fast load times, and 825GB SSD.",
            "seller_id": Math.floor(Math.random() * 10)+1,
            "category_id": 8,
            "currency": "INR",
            "brand_id": brands.findIndex(brand => brand.name == 'Sony') + 1,
            "condition": "new",
            "price": 499.99
        }
    ]

    const media = [
        {
            "url": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/airpodspro.jpg",
            "type": "image",
            "parent_id": 1,
            "parent_type": "product"
        },
        {
            "url": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/applewatch.jpg",
            "type": "image",
            "parent_id": 2,
            "parent_type": "product"
        },
        {
            "url": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/boseheadphones.jpg",
            "type": "image",
            "parent_id": 3,
            "parent_type": "product"
        },
        {
            "url": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/dysonvacuum.jpg",
            "type": "image",
            "parent_id": 4,
            "parent_type": "product"
        },
        {
            "url": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/galaxys24ultra.jpg",
            "type": "image",
            "parent_id": 5,
            "parent_type": "product"
        },
        {
            "url": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/ipad.jpg",
            "type": "image",
            "parent_id": 6,
            "parent_type": "product"
        },
        {
            "url":  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/iphone16pro.jpg",
            "type": "image",
            "parent_id": 7,
            "parent_type": "product"
        },
        {
            "url": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/macbookpro.jpg",
            "type": "image",
            "parent_id": 8,
            "parent_type": "product"
        },
        {
            "url":  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/nikeairmax.jpg",
            "type": "image",
            "parent_id": 9,
            "parent_type": "product"
        },
        {
            "url":  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/playstation5.jpg",
            "type": "image",
            "parent_id": 10,
            "parent_type": "product"
        }
    ]

    const categories = [
        {
            name: "Electronics"
        },
        {
            name: "Apparel"
        },
        {
            name: "Watches"
        },
        {
            name: "Men's Clothing",
            parent_category_id: 2
        },
        {
            name: "Women's Clothing",
            parent_category_id: 2
        },
        {
            name: "Sunglasses"
        },
        {
            name: "Laptops",
            parent_category_id: 1
        },
        {
            name: "Mobile Phones",
            parent_category_id: 1
        }
    ]

    const attributes = [
        {
            name: "color",
            values: ['black','white','blue','green','grey','orange','pink'],
            default_value: 'white'
        },
        {
            name: "shape",
            values: ['round','short','long'],
            default_value: 'white'
        },
        {
            name: "size",
            values: ['26','28','30','32','XL','L','M','S'],
            default_value: 'white'
        }
    ]

    const category_attributes = [
        {
            category_id: 1,
            attribute_id: 1
        },
        {
            category_id: 2,
            attribute_id: 1
        },
        {
            category_id: 2,
            attribute_id: 3
        },
        {
            category_id: 3,
            attribute_id: 1
        },
        {
            category_id: 4,
            attribute_id: 1
        },
        {
            category_id: 4,
            attribute_id: 3
        },
        {
            category_id: 5,
            attribute_id: 1
        },
        {
            category_id: 6,
            attribute_id: 1
        },
        {
            category_id: 6,
            attribute_id: 3
        },
        {
            category_id: 7,
            attribute_id: 1
        },
        {
            category_id: 8,
            attribute_id: 1
        },
        {
            category_id: 8,
            attribute_id: 3
        }
    ]

    const product_categories = [
        {
            product_id: 1,
            category_id: 1
        },
        {
            product_id: 2,
            category_id: 3
        },
        {
            product_id: 3,
            category_id: 1
        },
        {
            product_id: 4,
            category_id: 1
        },
        {
            product_id: 5,
            category_id: 1
        },
        {
            product_id: 6,
            category_id: 1
        },
        {
            product_id: 7,
            category_id: 2
        },
        {
            product_id: 8,
            category_id: 2
        },
        {
            product_id: 9,
            category_id: 2
        },
        {
            product_id: 10,
            category_id: 2
        }
    ]

    const product_attributes = [
        {
            product_id: 1,
            attribute_id: 1,
            value: "black"
        },
        {
            product_id: 1,
            attribute_id: 2,
            value: "XL"
        },
        {
            product_id: 2,
            attribute_id: 1,
            value: "black"
        },
        {
            product_id: 3,
            attribute_id: 1,
            value: "white"
        },
        {
            product_id: 3,
            attribute_id: 2,
            value: "36"
        },
        {
            product_id: 4,
            attribute_id: 1,
            value: "white"
        },
        {
            product_id: 5,
            attribute_id: 1,
            value: "black"
        },
        {
            product_id: 6,
            attribute_id: 1,
            value: "blue"
        },
        {
            product_id: 7,
            attribute_id: 2,
            value: "small"
        },
        {
            product_id: 8,
            attribute_id: 2,
            value: "large"
        },
        {
            product_id: 9,
            attribute_id: 2,
            value: "small"
        },
        {
            product_id: 10,
            attribute_id: 3,
            value: "L"
        }
    ]

    console.log('\n\n Starting Seed...');

    console.log('\n\n Seeding Categories');
    await db.insert(categoriesTable).values(categories);

    console.log('\n\n Seeding Attributes');
    await db.insert(attributesTable).values(attributes);

    console.log('\n\n Seeding Category Attributes');
    await db.insert(categoryAttributesTable).values(category_attributes);

    console.log('\n\n Seeding Brands...');
    await db.insert(brandsTable).values(brands);

    console.log('\n\n Seeding Products...');
    await db.insert(productsTable).values(products);

    console.log('\n\n Seeding Media...');
    await db.insert(mediaTable).values(media);

    console.log('\n\n Seeding Product Categories...');
    await db.insert(productCategoriesTable).values(product_categories);

    console.log('\n\n Seeding Product Attributes...');
    await db.insert(productAttributesTable).values(product_attributes);

    console.log('\n\n Seeding Users...');
    await db.insert(usersTable).values(users);

    console.log('\n\n Seeding Addresses...');
    await db.insert(addressesTable).values(addresses);
    

    console.log('\n\n Seeding Complete.');
}
main();