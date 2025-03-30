import {Request, Response} from "express";

export async function login(req: Request, res: Response) {
    try {
        
        var user = req.user;
        if(user){
            res.status(200).json(user);
        } else {
            throw new Error();
        }
                    
    } catch (e) {
        console.log(e);
        res.status(500).send('Error!');
    }
    
}

