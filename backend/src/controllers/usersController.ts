import {Request, Response} from "express";

const User = require("../models/user");

export async function createUser(req: Request, res: Response) {

    try {

        var user = req.body;
        var userObj = await User.create(user);
        res.status(201).json(userObj);
        
    } catch (e) {
        
        res.status(500).send('Error!');
    }
   
}

export async function getUser(req: Request, res: Response) {

    try {
        const id = Number(req.params.id);
        const user = await User.get(id);

        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not Found!');
        }
        
    } catch (e) {

        res.status(500).send('Error!');
    }
   
}

export async function updateUser(req: Request, res: Response) {

    try {

        var user = req.body;
        var userObj = await User.update(req.user.id, user);
        res.status(200).json(userObj);
        
    } catch (e) {

        res.status(500).send('Error!');
    }
   
}

