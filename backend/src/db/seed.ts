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
import { ConsoleLogWriter, sql } from 'drizzle-orm';

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const env = process.env.ENV as string;

const BaseImageURL = 'https://images.unsplash.com/';

const productImages = [
    'photo-1509319117193-57bab727e09d',
    'photo-1591047139829-d91aecb6caea',
    'photo-1611312449412-6cefac5dc3e4',
    'photo-1564858775248-ab611c9abd3d',
    'photo-1564584217132-2271feaeb3c5',
    'photo-1493455198445-863243d88564',
    'photo-1525171254930-643fc658b64e',
    'photo-1525507119028-ed4c629a60a3',
    'photo-1620799140188-3b2a02fd9a77',
    'photo-1604176354204-9268737828e4',
    'photo-1529374255404-311a2a4f1fd9',
    'photo-1727063165870-0a1bc4c75240',
    'photo-1727516299214-c4d54704b045',
    'photo-1632337949070-1fdb69fe2159',
    'photo-1604508230015-5a54faf1fa56',
    'photo-1632337948797-ba161d29532b',
    'photo-1698586252650-f0d15ff0c8da',
    'photo-1601136610007-1ecf5706c908',
    'photo-1642853474913-47215b056991',
    'photo-1636831990771-c70381797936',
    'photo-1731267776886-90f90af75eb1',
    'photo-1631112213238-b1bafeaecff3',
    'photo-1690967132728-9118808d8d0d',
    'photo-1668656690099-49987f3425f8',
    'photo-1627862931693-e05f02d692de',
    'photo-1676949461332-b64e9257e0c7',
    'photo-1610049199961-3cd0223834ef',
    'photo-1591506367277-1c45a94d2024',
    'photo-1742392133846-a8b416e81661',
    'photo-1581655353466-d5ad6765dd37',
    'photo-1716835239738-5cb4b27341d0',
    'photo-1739384879592-79903b12b2a6',
    'photo-1662915358274-dde61c1cb53b',
    'photo-1662199653867-cb26d247c893',
    'photo-1540313551795-accd07d3e058',
    'photo-1739384994765-d44f7af12029',
    'photo-1716541425103-fcfd4bf88c27',
    'photo-1572005673041-035dec825e2d'
];
const statuses = ['live', 'draft'];
const conditions = ['new', 'like_new', 'gently_used'];
const product_names = ['Hoodie', 'TShirt', 'Jeans', 'Sweater', 'Shirt', 'Short', 'Jumper', 'Slipper', 'Tie', 'Polo Shirt',
    'Ripped Jeans', 'Round Neck', 'Denim Short', 'Sweatshirt', 'Bell Bottom', 'Bandana', 'Vest', 'Jacket', 'Poncho', 'Parka'];
const prices = [100.00, 99.99, 1000.00, 599.99, 499.00, 4999.99, 999.99, 49.00, 51.00, 10.00 ];
const sellers = [1,2,3,4,5,6,7,8,9,10];

function getRandomItem(array) {
    let index = Math.floor(Math.random()*array.length);
    return array[index];
}

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

    // const db = drizzle(process.env.DATABASE_URL!);
    // await reset(db, schema);

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
            email: "sambhav.swift@gmail.com",
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
            "status": "live",
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
            "status": "live",
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
            "status": "live",
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
            "status": "live",
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
            "status": "live",
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
            "status": "live",
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
            "status": "live",
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
            "status": "live",
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
            "status": "live",
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
            "status": "live",
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
            name: "Menswear",
            code: "menswear",
            category_type: "Department",
            subCategory: [
                {
                    name: "Mens Topwear",
                    code: "menstopwear",
                    category_type: "Category",
                    subCategory: [
                        {
                            name: "Shirts",
                            code: "shirt",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "T Shirts",
                            code: "tshirt",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Polos",
                            code: "polo",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Sweaters",
                            code: "sweaters",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Jackets",
                            code: "jacket",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Hoodies",
                            code: "hoodie",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        }
                    ]
                },
                {
                    name: "Mens Bottomwear",
                    code: "mensbottomwear",
                    category_type: "Category",
                    subCategory: [
                        {
                            name: "Jeans",
                            code: "jeans",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Pants",
                            code: "pants",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Shorts",
                            code: "shorts",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Joggers",
                            code: "joggers",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Sweatpants",
                            code: "sweatpants",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        }
                    ]
                },
                {
                    name: "Mens Sportwear",
                    code: "menssportswear",
                    category_type: "Category",
                    subCategory: [
                        {
                            name: "Joggers",
                            code: "joggers",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Leggings",
                            code: "leggings",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Shorts",
                            code: "shorts",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        }
                    ]
                },
                {
                    name: "Mens Sleepwear",
                    code: "menssleepwear",
                    category_type: "Category",
                    subCategory: [
                        {
                            name: "Pyjamas",
                            code: "pyjama",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        }
                    ]
                }
            ]
        },
        {
            name: "Womenswear",
            code: "womenswear",
            category_type: "Department",
            subCategory: [
                {
                    name: "Womens Topwear",
                    code: "womenstopwear",
                    category_type: "Category",
                    subCategory: [
                        {
                            name: "Shirts",
                            code: "shirt",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "T Shirts",
                            code: "tshirt",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Polos",
                            code: "polo",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Sweaters",
                            code: "sweaters",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Jackets",
                            code: "jacket",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Hoodies",
                            code: "hoodie",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        }
                    ]
                },
                {
                    name: "Womens Bottomwear",
                    code: "womensbottomwear",
                    category_type: "Category",
                    subCategory: [
                        {
                            name: "Jeans",
                            code: "jeans",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Pants",
                            code: "pants",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Shorts",
                            code: "shorts",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Joggers",
                            code: "joggers",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Sweatpants",
                            code: "sweatpants",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Short Skirts",
                            code: "shortskirts",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Long Skirts",
                            code: "longskirts",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        }
                    ]
                },
                {
                    name: "Womens Sportwear",
                    code: "womenssportswear",
                    category_type: "Category",
                    subCategory: [
                        {
                            name: "Joggers",
                            code: "joggers",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Leggings",
                            code: "leggings",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Shorts",
                            code: "shorts",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        }
                    ]
                },
                {
                    name: "Womens Sleepwear",
                    code: "womenssleepwear",
                    category_type: "Category",
                    subCategory: [
                        {
                            name: "Pyjamas",
                            code: "pyjama",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        }
                    ]
                }
            ]
        },
        {
            name: "Kidswear",
            code: "kidswear",
            category_type: "Department",
            subCategory: [
                {
                    name: "Kids Topwear",
                    code: "kidstopwear",
                    category_type: "Category",
                    subCategory: [
                        {
                            name: "Shirts",
                            code: "shirt",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Tshirts",
                            code: "tshirt",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Sweaters",
                            code: "sweater",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Sweatshirts",
                            code: "sweatshirts",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        }
                    ]
                },
                {
                    name: "Kids Bottomwear",
                    code: "kidsbottomwear",
                    category_type: "Category",
                    subCategory: [
                        {
                            name: "Skirts",
                            code: "skirts",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Pants",
                            code: "pants",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Jeans",
                            code: "jeans",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Shorts",
                            code: "shorts",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        }
                    ]
                }
            ]
        },
        {
            name: "Footwear",
            code: "footwear",
            category_type: "Department",
            subCategory: [
                {
                    name: "Shoes",
                    code: "shoes",
                    category_type: "Category",
                    attributes: ['color','size']
                },
                {
                    name: "Sandals",
                    code: "sandals",
                    category_type: "Category",
                    attributes: ['color','size']
                },
                {
                    name: "Flipflops",
                    code: "flipflops",
                    category_type: "Category",
                    attributes: ['color','size']
                }
            ]
        },
        {
            name: "Accessories",
            code: "accessories",
            category_type: "Department",
            subCategory: [
                {
                    name: "Watches",
                    code: "watches",
                    category_type: "Category",
                    subCategory: [
                        {
                            name: "Mens Watches",
                            code: "menswatches",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Womens Watches",
                            code: "womenswatches",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        }
                    ]
                },
                {
                    name: "Sunglasses",
                    code: "sunglasses",
                    category_type: "Category",
                    subCategory: [
                        {
                            name: "Mens Sunglasses",
                            code: "menssunglasses",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        },
                        {
                            name: "Womens Sunglasses",
                            code: "womenssunglasses",
                            category_type: "Subcategory",
                            attributes: ['color','size']
                        }
                    ]
                }
            ]
        }
    ]

    const attributes = [
        {
            name: "Color",
            code: "color",
            values: ['black','white','blue','green','grey','orange','pink','red','purple'],
            default_value: 'white'
        },
        {
            name: "Shape",
            code: "shape",
            values: ['round','short','long'],
            default_value: 'round'
        },
        {
            name: "Size",
            code: "size",
            values: ['26','28','30','32','XXXL','XXL','XL','L','M','S','XS','Small', 'Medium', 'Large', 'Big'],
            default_value: 'L'
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

    console.log('\n\n Seeding Attributes');
    const attributesMap = await seedAttributes(attributes); 

    console.log('\n\n Seeding Categories');
    let persistedCategories = await seedCategories(categories, brands, attributesMap);

    console.log('\n\n Seeding Brands...');
    await db.insert(brandsTable).values(brands);

    // console.log('\n\n Seeding Products...');
    // await seedProducts(persistedCategories);
    
    //await db.insert(productsTable).values(products);

    // console.log('\n\n Seeding Media...');
    // await db.insert(mediaTable).values(media);

    // console.log('\n\n Seeding Product Categories...');
    // await db.insert(productCategoriesTable).values(product_categories);

    // console.log('\n\n Seeding Product Attributes...');
    // await db.insert(productAttributesTable).values(product_attributes);

    // console.log('\n\n Seeding Users...');
    // await db.insert(usersTable).values(users);

    // console.log('\n\n Seeding Addresses...');
    // await db.insert(addressesTable).values(addresses);
    
    console.log('\n\n Seeding Complete.');
}

async function seedCategories(categories: [{name: string, code: string, attributes: [], subCategory: []}], 
    brands: [],
    attributesMap: {}
) {

    let allCategories = categories;
    let categoryAttributes = [];
    
    // Seeding Departments
    for (let department of categories) {

        let departmentObj = await insertCategory(department);
        let categories = department.subCategory || [];

        categoryAttributes = categoryAttributes.concat(
            getCategoryAttributes(departmentObj.id, department.attributes, attributesMap)
        );
            
        if(categories.length == 0) {
            await seedProducts({
                department_id: departmentObj.id,
            }, brands);
        }

        // Seeding Category
        for (let category of categories) {

            let categoryObj = await insertCategory({
                ...category,
                parent_category_id: departmentObj.id
            });
            let subcategories = category.subCategory || [];

            categoryAttributes = categoryAttributes.concat(
                getCategoryAttributes(categoryObj.id, category.attributes, attributesMap)
            );

            if(subcategories.length == 0) {
                await seedProducts({
                    department_id: departmentObj.id,
                    category_id: categoryObj.id
                }, brands);
            }

            // Seeding SubCategory
            for (let subcategory of subcategories) {

                let subcategoryObj = await insertCategory({
                    ...subcategory,
                    parent_category_id: categoryObj.id
                });
                let types = subcategory.subCategory || [];

                categoryAttributes = categoryAttributes.concat(
                    getCategoryAttributes(subcategoryObj.id, subcategory.attributes, attributesMap)
                );
                
                if(types.length == 0) {
                    await seedProducts({
                        department_id: departmentObj.id,
                        category_id: categoryObj.id,
                        subcategory_id: subcategoryObj.id
                    }, brands);
                }

                // Seeding Product Types
                for (let type of types) {

                }
            }
        }
    }

    console.log('\n\n Seeding Category Attributes');
    const respoonse = await db.insert(categoryAttributesTable).values(categoryAttributes);

    return allCategories;
}

async function seedAttributes(attributes: [{name: string, code: string}]) {

    let attributeObj;
    let attributesMap = {};
    for (let attribute of attributes) {
        [attributeObj] = await db.insert(attributesTable).values({
            name: attribute.name,
            code: attribute.code,
        }).returning();
        
        attributesMap[attributeObj.code] = attributeObj.id
    }

    return attributesMap;
}

async function seedProducts(category_ids, brands) {
    
    let num_products = Math.floor(Math.random()*10)+1;
    let random_brand = getRandomItem(brands).name;
    let brand_id = brands.findIndex(brand => brand.name == random_brand) + 1;

    for (let i = 0; i < num_products; i++) {
        
        let productObj = await insertProduct(category_ids, brand_id);
        let response = await seedMedia(productObj.id);
    }
}

async function seedMedia(product_id) {
    let num_media = Math.floor(Math.random()*5)+1;
    let media = [];

    for (let i = 0; i < num_media; i++) {
        let url = `${BaseImageURL}${getRandomItem(productImages)}`;
        console.log(url);
        media.push({
            url:  url,
            parent_id: product_id,
            parent_type: "product",
            type: "image",
        })
    }

    return await db.insert(mediaTable).values(media);
}

async function insertCategory(category) {
    let categoryObj;
    [categoryObj] = await db.insert(categoriesTable).values({
        name: category.name,
        code: category.code,
        category_type: category.category_type,
        parent_category_id: category.parent_category_id
    }).returning();

    return categoryObj;
}

async function insertProduct(category_ids, brand_id) {

    let productObj;
    let product = {
        name:  getRandomItem(product_names),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus quam nec ante tempor convallis. Sed lectus erat, interdum eu egestas vel, tristique consectetur metus. Proin eget egestas augue.",
        seller_id: getRandomItem(sellers),
        status:  "live",//getRandomItem(statuses),
        currency: "INR",
        brand_id: brand_id,
        condition: getRandomItem(conditions),
        price: getRandomItem(prices),
        ...category_ids
    };

    [productObj] = await db.insert(productsTable).values(product).returning();
    return productObj;
}

function getCategoryAttributes(category_id: number, attributes: [], attributesMap: {}) {
    
    let categoryAttributes = [];

    for (let attribute of attributes || []) {
        categoryAttributes.push({
            category_id: category_id,
            attribute_id: attributesMap[attribute]
        })
    }

    return categoryAttributes;
}

main();