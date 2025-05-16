import {Request, Response} from "express";

const Address = require("../models/address");

export async function createAddress(req: Request, res: Response) {

    try {

        var address = req.body;
        var addressObj = await Address.create(address);
        res.status(201).json(addressObj);
        
    } catch (e) {
        
        res.status(500).send('Error!');
    }
}

export async function createUserAddress(req: Request, res: Response) {

    try {

        let user = req.user;
        var address = req.body;
        var addressObj = await Address.createUserAddress(user.id, address);
        res.status(201).json(addressObj);
        
    } catch (e) {
        
        res.status(500).send('Error!');
    }
}


export async function getUserAddress(req: Request, res: Response) {

    try {
    
        const address = await Address.getUserAddress(req.user.id);

        if(address) {
            res.status(200).json(address);
        } else {
            res.status(404).send('Address not Found!');
        }
        
    } catch (e) {

        res.status(500).send('Error!');
    }
   
}

export async function updateAddress(req: Request, res: Response) {

    try {
        const id = Number(req.params.id);
        const address = req.body;

        if(address["parent_type"] === "user" && address["parent_id"] != req.user.id){
            throw {error: "Operation not allowed!"}
        }

        const addressObj = await Address.update(id, address);
        res.status(200).json(addressObj);
        
    } catch (e) {
        console.log(e)
        res.status(500).send('Error!');
    }
   
}

