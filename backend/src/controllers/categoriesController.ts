import {Request, Response} from "express";

const Category = require("../models/category");
const DEFAULT_LIMIT = 10;

export async function listCategories(req: Request, res: Response) {
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit) || DEFAULT_LIMIT;
        const offset = (page-1) * limit;

        const categories = await Category.list(limit, offset);
        res.status(200).json(categories);

    } catch (e) {
        console.log(e);
        res.status(500).send('Error!');
    }
    
}



