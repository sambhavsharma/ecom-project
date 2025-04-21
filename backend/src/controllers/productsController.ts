import {Request, Response} from "express";
import { db } from "../db";
import { productsTable } from "../db/products";
import { eq, and } from "drizzle-orm";

const Product = require("../models/product");

const DEFAULT_LIMIT = 15;

export async function listProducts(req: Request, res: Response) {
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit) || DEFAULT_LIMIT;
        const offset = (page-1) * limit;

        const products = await Product.list(limit, offset);
        res.status(200).json(products);

    } catch (e) {
        console.log(e);
        res.status(500).send('Error!');
    }
    
}

export async function getProduct(req: Request, res: Response) {

    try {
        const id = Number(req.params.id);
        const product = await Product.get(id);

        if(product) {
            res.status(200).json(product);
        } else {
            res.status(404).send('Produt not Found!');
        }
        
    } catch (e) {
        console.log(e);
        res.status(500).send('Error!');
    }
   
}

export async function createProduct(req: Request, res: Response) {

    try {
        
        var product = req.body;
        var productObj = await Product.create(product);
        res.status(201).json(productObj);

    } catch (e) {
        console.log(e);
        res.status(500).send('Error creating product');
    }
}

export async function updateProduct(req: Request, res: Response) {

    try {
        const id = Number(req.params.id);
        const updateFields = req.body;
        const [product] = await db.update(productsTable)
            .set(updateFields)
            .where(and(
                eq(productsTable.id, id),
                eq(productsTable.is_deleted, false)
            ))
            .returning();

        if(product) {
            res.status(200).json(product);
        } else {
            res.status(404).send('Produt not Found!');
        }
    } catch (e) {
        res.status(500).send('Error!');
    }

    
}

export async function deleteProduct(req: Request, res: Response) {

    try {
        const id = Number(req.params.id);
        const [product] = await db.update(productsTable)
            .set({is_deleted: true})
            .where(eq(productsTable.id, id))
            .returning();

        if(product) {
            res.status(200).json(product);
        } else {
            res.status(404).send('Produt not Found!');
        }
    } catch (e) {
        res.status(500).send('Error!');
    }
}