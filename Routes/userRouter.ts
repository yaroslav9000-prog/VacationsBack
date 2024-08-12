import { Router, Request, Response, NextFunction } from 'express';
import { fetchUsers } from '../src/resources/user/users.controller';
import { handleNewUser } from '../Controllers/register';
import { handleLogin } from '../Controllers/login';
import { verifyJWT } from '../MiddleWare/verifyJWT';
export const userRouter = Router();



userRouter.get("/login", async(req: Request, res: Response, next: NextFunction)=>{
    try{
        handleLogin(req, res, next);
        
    }catch(e){
        console.log(`mistake occured while you fetching data`);
        res.status(500).json('you fucked up boy');
    }
})
userRouter.post("/registerUser", (req: Request, res: Response)=>{
    handleNewUser(req, res);
})


