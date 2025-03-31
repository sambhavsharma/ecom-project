import {Request, Response} from "express";

const User = require("../models/user");

export async function create(req: Request, res: Response) {

    try {

        var user = req.body;
        var userObj = await User.create(user);
        res.status(201).json(userObj);
        
    } catch (e) {
        console.log(e);
        res.status(500).send('Error!');
    }
   
}

