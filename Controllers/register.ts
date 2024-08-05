import { User } from "../src/resources/user/user";
import { userModel } from "../src/resources/user/user.model";
import { fetchUsers } from "../src/resources/user/users.controller";
import {Request, Response} from "express";
const handleNewUser = async(req: Request, res: Response)=>{
    const {email} = req.body;
    const usersData = await fetchUsers();
    const duplicateEmail = usersData.filter((item: User)=> item.email === email);
    if(duplicateEmail) return res.status(400).json({"msg": "duplicate was found"});
    try{
        const bodyReq = req.body;
        const newUser = new User(bodyReq.firstName, bodyReq.lastName, bodyReq.email, bodyReq.pwd, bodyReq.role);
        await userModel.create(newUser);
        res.status(200).json({"msg": "new user created!"})
    }catch(e: any){
        console.log(e.message);
    }
}