import {Request, Response} from "express";

const Util = require("../models/util");
const Category = require("../models/category");


export async function getMenu(req: Request, res: Response) {
    try {

        const menu = await Util.getMenu();
        res.status(200).json(menu);

    } catch (e) {
        //console.log(e);
        res.status(500).send('Error!');
    }
}

export async function getCategoryMap(req: Request, res: Response) {
    try {

        const categoryMap = await Category.getCategoryMap();
        res.status(200).json(categoryMap);

    } catch (e) {
        console.log(e);
        res.status(500).send('Error!');
    }
}




