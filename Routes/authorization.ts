import { Router, Request, Response } from 'express';
import { fetchUsers } from '../src/resources/user/users.controller';
import { handleNewUser } from '../Controllers/register';
export const authorizationRouter = Router();

authorizationRouter.get("/api/login", async(req: Request, res: Response)=>{
    try{
        const data = await fetchUsers();
        res.status(200).json(data);
        console.log('I fetched you the users');
    }catch(e){
        console.log(`mistake occured while you fetching data`);
        res.status(500).json('you fucked up boy');
    }
})
authorizationRouter.post("/api/registerUser", (req: Request, res: Response)=>{
    handleNewUser(req, res);
})


