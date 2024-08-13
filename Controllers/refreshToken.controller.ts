import { Types } from 'mongoose';
import {Response, Request, NextFunction} from "express";
import { fetchUsers } from "../src/resources/user/users.controller";
import { User } from "../src/resources/user/user";
import jwt from "jsonwebtoken";
import { userModel } from "../src/resources/user/User.model";
import * as mongoDB from "mongodb";

const ObjectId = mongoDB.ObjectId;

const result = require("dotenv").config();
const env = result.parsed;


const handleRefreshToken = async (req: Request, res: Response, next: NextFunction)=>{
    const cookies = req.cookies 
    // const duplicateEmail = usersData.find((item: User)=> item.email == email);
    // if(!req.body.pwd || !req.body.email) return res.status(400).json({"msg": "password and username is required"});
    // const foundUser= usersData.find((item: User)=> item.email == req.body.email);
    if(!cookies?.jwt){
        return res.sendStatus(401);
    }
        //Before i finish i generate a jwt for a user.
        console.log(cookies);
        const refreshToken = cookies.jwt;
        
        
        const someDoc = await userModel.findByIdAndUpdate({_id: id}, {$set: {"token": refreshToken}});
        console.log(someDoc);
        res.status(200).json({"msg":accessToken});
    }
    
}