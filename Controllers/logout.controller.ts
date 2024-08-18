import { Types } from 'mongoose';
import {Response, Request, NextFunction} from "express";
import { User } from "../src/resources/user/user";
import { userModel } from "../src/resources/user/User.model";
import * as mongoDB from "mongodb";
import { ObjectId } from 'mongodb';



export const handleLogout = async (req: Request, res: Response, next: NextFunction)=>{
    const cookies = req.cookies

    if(!cookies?.jwt) return res.sendStatus(204) // Query is succesfull but i got no content to send.

    const refreshToken = cookies.jwt;

    const foundUser: User| null = await userModel.findOne({token: `${refreshToken}`});

    if(!foundUser){
        res.clearCookie('jwt', {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
        return res.sendStatus(204);
    }
    const id : mongoDB.ObjectId = new ObjectId(`${foundUser.id}`)
    // const id = foundUser.id;
    //Now i delete the refresh token from db
    console.log("some problem with my querry");
    await userModel.findByIdAndUpdate({_id: id}, {$set: {"token": ''}});
    console.log("no problem with querry");
    res.sendStatus(200);
}
    
