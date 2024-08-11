import { Router, Request, Response } from 'express';
import { fetchUsers } from '../src/resources/user/users.controller';
import { handleNewUser } from '../Controllers/register';
import { handleLogin } from '../Controllers/login';
export const authorizationRouter = Router();

authorizationRouter.get("/login", async(req: Request, res: Response)=>{
    try{
        handleLogin(req, res)
        console.log('I fetched you the users');
    }catch(e){
        console.log(`mistake occured while you fetching data`);
        res.status(500).json('you fucked up boy');
    }
})
authorizationRouter.post("/registerUser", (req: Request, res: Response)=>{
    handleNewUser(req, res);
})


