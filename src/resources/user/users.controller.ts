import { User } from "./user";
import { userModel } from "./user.model"; 
import {Request, Response} from "express";
const fetchUsers = async()=>{
    return await userModel.find({});
}


export{
    fetchUsers,
}