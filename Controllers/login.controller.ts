import { Types } from 'mongoose';
import {Response, Request, NextFunction} from "express";
import { fetchUsers } from "../src/resources/user/users.controller";
import { User } from "../src/resources/user/user";
import fs from "node:fs";
import jwt from "jsonwebtoken";
import { userModel } from "../src/resources/user/User.model";
import * as mongoDB from "mongodb";
import path from 'node:path';

const ObjectId = mongoDB.ObjectId;

const result = require("dotenv").config();
const env = result.parsed;


const handleLogin = async (req: Request, res: Response, next: NextFunction)=>{
    const pwd = req.query.pwd
    const email = req.query.email
    console.log(pwd, email)
    // const duplicateEmail = usersData.find((item: User)=> item.email == email);
    if(!pwd || !email) return res.status(400).json({"msg": "password and username is required"});
    const foundUser= await userModel.findOne({email: email, pwd: pwd});
    if(!foundUser){
        console.log("entered false statement");
        return res.sendStatus(401);
    }else{
        //Before i finish i generate a jwt for a user.
        console.log("users pwd and email matched");
        const jwtPayload = {
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.firstName,
            role: foundUser.role
        }
        const accessTokenSecret = env["ACCESS_TOKEN_SECRET"];
        const refreshTokenSecret = env["REFRESH_TOKEN_SECRET"];
        const accessToken = jwt.sign(
            jwtPayload,
            accessTokenSecret,
            {expiresIn: "3h"}
        );
        const refreshToken = jwt.sign(
            jwtPayload,
            refreshTokenSecret,
            {expiresIn: "1d"}
        );

        const id : mongoDB.ObjectId = new ObjectId(`${foundUser._id}`);

        await userModel.findByIdAndUpdate({_id: id}, {$set: {"token": refreshToken}});
        res.cookie("jwt", refreshToken, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}).status(200).json({"token":accessToken, "user": foundUser});
        
    }
    
}

export{
    handleLogin
}