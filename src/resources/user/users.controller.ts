import { User } from "./user";
import { userModel } from "./User.model"; 
import {Request, Response} from "express";
const fetchUsers = async()=>{
    return await userModel.find({});
}


export{
    fetchUsers,
}