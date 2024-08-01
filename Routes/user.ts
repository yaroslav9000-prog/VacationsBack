import { Router, Request, Response } from 'express';
import { userModel } from '../src/mongoDB/models/user.model';
export const userRouter = Router();

userRouter.get("/users", async(req: Request, res: Response)=>{
    try{
        const data = await userModel.find({});
        res.status(200).json(data);
        console.log('I fetched you the users');
    }catch(e){
        console.log(`mistake occured while you fetching data`);
        res.status(500).json('you fucked up boy');
    }
})