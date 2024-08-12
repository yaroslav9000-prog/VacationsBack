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


const handleLogin = async (req: Request, res: Response, next: NextFunction)=>{
    const {email, pwd} = req.body;
    const usersData = await fetchUsers();
    // const duplicateEmail = usersData.find((item: User)=> item.email == email);
    console.log(usersData);
    if(!req.body.pwd || !req.body.email) return res.status(400).json({"msg": "password and username is required"});
    const foundUser= usersData.find((item: User)=> item.email == req.body.email);
    if(foundUser === undefined){
        console.log("entered false statement");
        return res.sendStatus(401);
    }else if(foundUser.email === email && foundUser.pwd === pwd){
        //Before i finish i generate a jwt for a user.
        console.log("users pwd and email matched");
        const jwtPayload = {
            email: foundUser.email,
            name: foundUser.firstName,
            role: foundUser.role
        }
        const accessTokenSecret = env["ACCESS_TOKEN_SECRET"];
        const refreshTokenSecret = env["REFRESH_TOKEN_SECRET"];
        const accessToken = jwt.sign(
            {"email": foundUser.email},
            accessTokenSecret,
            {expiresIn: "30s"}
        );
        const refreshToken = jwt.sign(
            jwtPayload,
            refreshTokenSecret,
            {expiresIn: "1d"}
        );

        const id : mongoDB.ObjectId = new ObjectId(`${foundUser._id}`);

        const someDoc = await userModel.findByIdAndUpdate({_id: id}, {$set: {"token": refreshToken}});
        console.log(someDoc);
        res.status(200).json({"msg":accessToken});
    }
    
}

export{
    handleLogin
}