import {Request, Response} from "express";
import { db } from "../db";
import { ordersTable } from "../db/orders";
import { eq, and } from "drizzle-orm";

const DEFAULT_LIMIT = 10;

export async function listOrders(req: Request, res: Response) {
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit) || DEFAULT_LIMIT;
        const offset = (page-1) * limit;
        
        const orders = await db.select()
            .from(ordersTable)
            //.where(eq(ordersTable.is_deleted, false))
            .limit(limit)
            .offset(offset);
        res.status(200).json(orders);
    } catch (e) {
        res.status(500).send('Error!');
    }
    
}

export async function getOrder(req: Request, res: Response) {

    try {
        const id = Number(req.params.id);
        const [order] = await db.select()
            .from(ordersTable)
            .where(and(
                eq(ordersTable.id, id),
                //eq(ordersTable.is_deleted, false)
            ));

        if(order) {
            res.status(200).json(order);
        } else {
            res.status(404).send('Order not Found!');
        }
        
    } catch (e) {
        res.status(500).send('Error!');
    }
   
}

export async function createOrder(req: Request, res: Response) {
    
    try {
        var {order, products} = req.body;
        const [orderObj] = await db.insert(ordersTable)
            .values(order)
            .returning();
        res.status(201).json(orderObj);
    } catch (e) {
        console.log(e);
        res.status(500).send('Error creating order');
    }
}

export async function updateOrder(req: Request, res: Response) {

    try {
        const id = Number(req.params.id);
        const updateFields = req.body;
        const [order] = await db.update(ordersTable)
            .set(updateFields)
            .where(and(
                eq(ordersTable.id, id),
                //eq(ordersTable.is_deleted, false)
            ))
            .returning();

        if(order) {
            res.status(200).json(order);
        } else {
            res.status(404).send('Order not Found!');
        }
    } catch (e) {
        res.status(500).send('Error!');
    }

    
}