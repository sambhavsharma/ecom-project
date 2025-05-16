import {Request, Response} from "express";

const Order = require("../models/order");

const DEFAULT_LIMIT = 10;

export async function createOrder(req: Request, res: Response) {
    
    try {
        var order = req.body;
        var orderObj = await Order.create(order, req.user.id);
        res.status(201).json(orderObj);
    } catch (e) {
        
        res.status(500).send('Error creating order');
    }
}

export async function getUserOrder(req: Request, res: Response) {
    
    try {
        const order_id = req.params.id;
        var orderObj = await Order.getUserOrder( order_id, req.user.id);
        res.status(200).json(orderObj);
    } catch (e) {
       
        res.status(500).send('Error fetching order');
    }
}

export async function getUserBuyOrders(req: Request, res: Response) {
    
    try {
        
        var orders = await Order.getUserBuyOrders( req.user.id);
        res.status(200).json(orders);
    } catch (e) {
        
        console.log(e);
        res.status(500).send('Error fetching orders');
    }
}

export async function getUserSaleOrders(req: Request, res: Response) {
    
    try {
        
        var orders = await Order.getUserSaleOrders( req.user.id);
        res.status(200).json(orders);
    } catch (e) {
        //console.log(e)
        res.status(500).send('Error fetching orders');
    }
}