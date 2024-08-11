import { Types } from 'mongoose';
import {Response, Request} from "express";
import { fetchUsers } from "../src/resources/user/users.controller";
import { User } from "../src/resources/user/user";
import jwt from "jsonwebtoken";
import { userModel } from "../src/resources/user/User.model";
import * as mongoDB from "mongodb";

const ObjectId = mongoDB.ObjectId;

const result = require("dotenv").config();
const env = result.parsed;


const handleLogin = async (req: Request, res: Response)=>{
    const {email} = req.body;
    const usersData = await fetchUsers();
    // const duplicateEmail = usersData.find((item: User)=> item.email == email);
    if(!req.body.pwd || req.body.firstName) return res.status(400).json({"msg": "password and username is required"});
    const foundUser = usersData.find((item: User)=> item.email == req.body.email);
    if(foundUser && foundUser.pwd === req.body.pwd){
        //Before i finish i generate a jwt for a user.
        const jwtPayload = {
            id: foundUser._id,
            name: foundUser.firstName,
            role: foundUser.role
        }
        const accessTokenSecret = env["ACCESS_TOKEN_SECRET"];
        const refreshTokenSecret = env["REFRESH_TOKEN_SECRET"];
        const accessToken = jwt.sign(
            jwtPayload,
            accessTokenSecret,
            {expiresIn: "30s"}
        );
        const refreshToken = jwt.sign(
            {"email": foundUser.email},
            refreshTokenSecret,
            {expiresIn: "1d"}
        );

        const id : mongoDB.ObjectId = new ObjectId(`${foundUser._id}`);

        const someDoc = await userModel.findByIdAndUpdate({_id: id}, {$set: {"refreshToken": refreshToken}});
        console.log(someDoc);
        res.json({accessToken});
    }else{
        return res.sendStatus(401);
    }
    
}

export{
    handleLogin
}