import { Router, Request, Response, NextFunction } from 'express';
import { fetchUsers } from '../src/resources/user/users.controller';
import { handleNewUser } from '../Controllers/register';
import { handleLogin } from '../Controllers/login';
import { verifyJWT } from '../MiddleWare/verifyJWT';
import express from "express";
export const authRouter = express.Router();



authRouter.get("/login", async(req: Request, res: Response, next: NextFunction)=>{
    try{
        console.log(req);
        handleLogin(req, res, next);
        
    }catch(e){
        console.log(`mistake occured while you fetching data`);
        res.status(500).json('you fucked up boy');
    }
})
authRouter.post("/registerUser", (req: Request, res: Response)=>{
    handleNewUser(req, res);
})


