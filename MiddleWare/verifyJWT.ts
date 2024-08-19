import * as jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express"
const result = require("dotenv").config();
const env = result.parsed;

export const verifyJWT = (req: any, res: Response, next: NextFunction)=>{
    const authHeader = req.headers['authorization'];
    console.log("one line before status 401, something went wrong withing the jwt verifyer")
    if(!authHeader) return res.sendStatus(401);
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        env["ACCESS_TOKEN_SECRET"],
        (err: any, decoded: any)=>{
            if(err) return res.sendStatus(403);
            req.email= decoded.email;
            next()
        }
    )
}