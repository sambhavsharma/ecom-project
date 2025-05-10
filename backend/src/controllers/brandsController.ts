import {Request, Response} from "express";

const Brand = require("../models/brand");

const DEFAULT_LIMIT = 20;

export async function createBrand(req: Request, res: Response) {

    try {

        var brand = req.body;
        var brandObj = await Brand.create(brand);
        res.status(201).json(brandObj);
        
    } catch (e) {
        
        res.status(500).send('Error!');
    }
}

export async function listBrands(req: Request, res: Response) {
    try {

        const limit = Number(req.query.limit) || DEFAULT_LIMIT;
        const brands = await Brand.list(req.query, limit);
        res.status(200).json(brands);

    } catch (e) {
        console.log(e);
        res.status(500).send('Error!');
    }
}






