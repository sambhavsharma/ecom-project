import {Request, Response} from "express";

const User = require("../models/user");
const Favorite = require("../models/favorite");

export async function createFavorite(req: Request, res: Response) {

    try {
        
        var favorite = req.body;
        var favoriteObj = await Favorite.create(favorite);
        res.status(201).json(favoriteObj);
        
    } catch (e) {
        
        res.status(500).send('Error!');
    }
   
}

export async function listFavorites(req: Request, res: Response) {

    try {

        const favorites = await Favorite.list(req.user.id);
        res.status(200).json(favorites);
    } catch (e) {
        console.log(e);
        res.status(500).send('Error!');
    }
   
}

export async function checkUserFavorite(req: Request, res: Response) {

    try {

        const product_id = Number(req.params.product_id);
        const favorites = await Favorite.checkUserFavorite(product_id, req.user.id);
        res.status(200).json(favorites);
    } catch (e) {
        console.log(e);
        res.status(500).send('Error!');
    }
   
}

export async function deleteFavorite(req: Request, res: Response) {

    try {

        const id = Number(req.params.id);
        const favorite = await Favorite.deleteFavorite(id, req.user.id);
        res.status(200).json(favorite);
        
    } catch (e) {
        console.log(e);
        res.status(500).send('Error!');
    }
   
}

