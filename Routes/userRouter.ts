import { Router, Request, Response } from 'express';
import { fetchUsers } from '../src/resources/user/users.controller';
import { handleNewUser } from '../Controllers/register';
import { handleLogin } from '../Controllers/login';
export const userRouter = Router();

userRouter.get("/login", async(req: Request, res: Response)=>{
    try{
        handleLogin(req, res)
        
    }catch(e){
        console.log(`mistake occured while you fetching data`);
        res.status(500).json('you fucked up boy');
    }
})
userRouter.post("/registerUser", (req: Request, res: Response)=>{
    handleNewUser(req, res);
})


