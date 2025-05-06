import {Request, Response} from "express";

const Product = require("../models/product");

const DEFAULT_LIMIT = 20;

export async function listProducts(req: Request, res: Response) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || DEFAULT_LIMIT;
        const offset = (page-1) * limit;

        const products = await Product.list(page, limit, offset, req.query);
        res.status(200).json(products);

    } catch (e) {
        //console.log(e);
        res.status(500).send('Error!');
    }
    
}

export async function getUserProducts(req: Request, res: Response) {
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit) || DEFAULT_LIMIT;
        const offset = (page-1) * limit;

        const user_id = Number(req.params.user_id);
        let returnDraft = req.user ? (user_id === req.user.id) : false;

        const products = await Product.getUserProducts(limit, offset, user_id, returnDraft);
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
        var productObj = await Product.create(product, req.user.id);
        res.status(201).json(productObj);

    } catch (e) {
        //console.log(e);
        res.status(500).send('Error creating product');
    }
}

export async function updateProduct(req: Request, res: Response) {

    try {
        const id = Number(req.params.id);
        const updateFields = req.body;

        var productObj = await Product.update(id, updateFields, req.user.id);
        res.status(200).json(productObj);

    } catch (e) {
        res.status(500).send('Error updating product!');
    }
}

export async function deleteProduct(req: Request, res: Response) {

    try {
        const id = Number(req.params.id);
        var productObj = await Product.deleteProduct(id, req.user.id);
        res.status(200).json(productObj);

    } catch (e) {
        res.status(500).send('Error deleting product!');
    }
}