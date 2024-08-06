import { followerModel } from "../src/resources/followers/followers.model";
import { User } from "../src/resources/user/user";
import { userModel } from "../src/resources/user/User.model";
import { fetchUsers } from "../src/resources/user/users.controller";
import {Request, Response} from "express";
export const handleNewUser = async(req: Request, res: Response)=>{
    const {email} = req.body;
    const usersData = await fetchUsers();
    const duplicateEmail = usersData.filter((item: User)=> item.email == email);
    if(duplicateEmail) return res.status(400).json({"msg": "duplicate was found"});
    try{
        const bodyReq = req.body;
        const newUser = new User(bodyReq.firstName, bodyReq.lastName, bodyReq.email, bodyReq.pwd, bodyReq.role);
        const newUserModel = new userModel(newUser);
        await followerModel.create({userId: newUserModel._id})
        res.status(200).json({"msg": "new user created!"})
    }catch(e: any){
        console.log(e.message);
    }
}