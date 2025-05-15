import {Request, Response} from "express";
import jwt from "jsonwebtoken";

const Auth = require("../models/auth");

const UserSerializer = require("../serializers/users");

const jwtOptions = {
    secretOrKey: "secret",
    expiresIn: 60*60 
  };  

export async function login(req: Request, res: Response) {
    try {
        
        let user = UserSerializer.userObj(req.user);

        if(user && user.id){
            let token = jwt.sign(user, jwtOptions.secretOrKey, { expiresIn: jwtOptions.expiresIn });

            res.status(200).json({            
                ...UserSerializer.userObj(user),
                token: token
            });
        } else {
            res.status(404).send('User not Found!');
        }
    } catch (e) {
        // console.log(e);
        res.status(500).send('Error!');
    }
    
}

export async function googleLogin(req: Request, res: Response) {
    try {

        const code = req.body.code;
        const user = await Auth.googleLogin(code);
       
        if(user && user.id){
            let token = jwt.sign(user, jwtOptions.secretOrKey, { expiresIn: jwtOptions.expiresIn });

            res.status(200).json({            
                ...UserSerializer.userObj(user),
                token: token
            });
        } else
            throw user

    } catch (e) {
        //console.log(e);
        res.status(500).send('Error!');
    }
    
}

export async function check(req: Request, res: Response) {
    try {
        
        res.status(200).json(UserSerializer.userObj(req.user));

    } catch (e) {
        
        res.status(500).send('Error!');
    }
    
}

