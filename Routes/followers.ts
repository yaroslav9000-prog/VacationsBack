import {Request, Response} from "express";
import express from "express";
import { addFollowForUser, deleteFollowForUser, getFollowsForUser } from "../src/resources/followers/follower.controller";
import { deleteVacation } from "../src/resources/vacation/vacation.controller";

export const followersRouter = express.Router();

followersRouter.get("/:id", async(req, res, next)=>{
    try{
        getFollowsForUser(req, res, next);
    }catch(err){
        console.log(err);
    }
})

followersRouter.post("/", async(req, res, next)=>{
    try{
        addFollowForUser(req, res, next)
    }catch(err){
        console.log(err);
    }
})

followersRouter.delete("/", async(req, res, next)=>{
    try{
        deleteFollowForUser(req, res, next);
    }catch(err){
        console.log(err);
    }
})