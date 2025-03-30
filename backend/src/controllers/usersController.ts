import {Request, Response} from "express";
import { db } from "../db";
import { usersTable } from "../db/usersSchema";

const User = require("../models/user");

const crypto = require('crypto');
const DEFAULT_LIMIT = 10;
const HASH_FUNCTION = 'sha256';


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

