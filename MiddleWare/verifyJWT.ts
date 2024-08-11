import * as jwt from "jsonwebtoken";
import {Request, Response} from "express"
const result = require("dotenv").config();
const env = result.parsed;

const verifyJWT = (req: Request, res: Response)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401);
    console.log(authHeader);
}