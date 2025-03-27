import {Request, Response} from "express";
import { db } from "../../db";
import { usersTable } from "../../db/usersSchema";
import { eq, and } from "drizzle-orm";

const crypto = require('crypto');
const DEFAULT_LIMIT = 10;
const HASH_FUNCTION = 'sha256';


export async function login(req: Request, res: Response) {
    try {

        var user = req.user;
        if(user){
            res.status(200).json(user);
        } else {
            throw new Error();
        }
                    
    } catch (e) {
        res.status(500).send('Error!');
    }
    
}

export async function register(req: Request, res: Response) {

    try {

        //var salt = crypto.randomBytes(16);
        var salt = "";
        crypto.pbkdf2(req.body.password, salt, 310000, 32, HASH_FUNCTION, async function(err, hashedPassword) {
            if (err) { throw new Error(); }

            var userParams = req.body;
            userParams['password'] = hashedPassword.toString('hex');
            const [user] = await db.insert(usersTable)
                .values(userParams)
                .returning();
            res.status(201).json(user);
        });
        
    } catch (e) {
        res.status(500).send('Error!');
    }
   
}

