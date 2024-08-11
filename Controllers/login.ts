import {Response, Request} from "express";
import { fetchUsers } from "../src/resources/user/users.controller";
import { User } from "../src/resources/user/user";

const handleLogin = async (req: Request, res: Response)=>{
    const {email} = req.body;
    const usersData = await fetchUsers();
    const duplicateEmail = usersData.find((item: User)=> item.email == email);
    if(!req.body.pwd || req.body.firstName) return res.status(400).json({"msg": "password and username is required"});
    const foundUser = usersData.find((item: User)=> item.email == req.body.email);
    if(foundUser && foundUser.pwd === req.body.pwd){
        //Before i finish i generate a jwt for a user.
        return res.status(200).json({"msg": "access granted"});
    }else{
        return res.sendStatus(401);
    }
    
}

export{
    handleLogin
}