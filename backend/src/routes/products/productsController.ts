import {Request, Response} from "express";
import { db } from "../../db";
import { productsTable } from "../../db/productsSchema";
import { eq, and } from "drizzle-orm";

const DEFAULT_LIMIT = 10;

export async function listProducts(req: Request, res: Response) {
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit) || DEFAULT_LIMIT;
        const offset = (page-1) * limit;
        
        const products = await db.select()
            .from(productsTable)
            .where(eq(productsTable.is_deleted, false))
            .limit(limit)
            .offset(offset);
        res.status(200).json(products);
    } catch (e) {
        console.log(JSON.stringify(e));
        res.status(500).send('Error!');
    }
    
}

export async function getProduct(req: Request, res: Response) {

    try {
        const id = Number(req.params.id);
        const [product] = await db.select()
            .from(productsTable)
            .where(and(
                eq(productsTable.id, id),
                eq(productsTable.is_deleted, false)
            ));

        if(product) {
            res.status(200).json(product);
        } else {
            res.status(404).send('Produt not Found!');
        }
        
    } catch (e) {
        res.status(500).send('Error!');
    }
   
}

export async function createProduct(req: Request, res: Response) {
    
    try {
        const [product] = await db.insert(productsTable)
            .values(req.body)
            .returning();
        res.status(201).json(product);
    } catch (e) {
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