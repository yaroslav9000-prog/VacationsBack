import { Types } from 'mongoose';
import {Response, Request, NextFunction} from "express";
import { fetchUsers } from "../src/resources/user/users.controller";
import { User } from "../src/resources/user/user";
import jwt from "jsonwebtoken";
import { userModel } from "../src/resources/user/User.model";
import * as mongoDB from "mongodb";

const result = require("dotenv").config();
const env = result.parsed;


export const handleRefreshToken = async (req: Request, res: Response, next: NextFunction)=>{
    const cookies = req.cookies
    console.log(cookies);
    // const duplicateEmail = usersData.find((item: User)=> item.email == email);
    // if(!req.body.pwd || !req.body.email) return res.status(400).json({"msg": "password and username is required"});
    // const foundUser= usersData.find((item: User)=> item.email == req.body.email);
    if(!cookies?.jwt) return res.sendStatus(401);
    //Before i finish i generate a jwt for a user.
    // console.log(cookies);
    const refreshToken = cookies.jwt;
        
    // console.log("One line before i declare foundUser var");    
    const foundUser = await userModel.findOne({token: refreshToken});
    // console.log("One line after i check the token.")
    if(!foundUser) return res.sendStatus(403); //Forbidden
    
    //Evaluate jwt
    jwt.verify(
        refreshToken, 
        env["REFRESH_TOKEN_SECRET"],
        (err: any, decoded: any)=>{
            if(err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"email": decoded.email},
                env["ACCESS_TOKEN_SECRET"],
                {expiresIn: '30s'}
            )
            res.json({accessToken});
        }
    )
    }
    
