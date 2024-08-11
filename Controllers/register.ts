import { ObjectId } from "mongodb";
import { followerModel } from "../src/resources/followers/followers.model";
import { User } from "../src/resources/user/user";
import { userModel } from "../src/resources/user/User.model";
import { fetchUsers } from "../src/resources/user/users.controller";
import {Request, Response} from "express";
export const handleNewUser = async(req: Request, res: Response)=>{
    const {email} = req.body;
    const usersData = await fetchUsers();
    const duplicateEmail = usersData.find((item: User)=> item.email == email);
    if(!req.body.pwd || req.body.firstName) return res.status(400).json({"msg": "password and username is required"});
    if(duplicateEmail) return res.status(400).json({"msg": "your email is already in use"});
    try{
        const bodyReq = req.body;
        const newUser = new User(bodyReq.firstName, bodyReq.lastName, bodyReq.email, bodyReq.pwd, bodyReq.role);
        const newUserModel = new userModel(newUser);
        const newFollower = new followerModel({_id: newUserModel._id , vacations: [ new ObjectId("66a6bf4bf8650847cc74ef30")]})
        console.log(newUserModel._id === newFollower._id);
        await userModel.create(newUserModel);
        await followerModel.create(newFollower);
        res.status(200).json({"msg": "new user created!"})
    }catch(e: any){
        console.log(e.message);
    }
}