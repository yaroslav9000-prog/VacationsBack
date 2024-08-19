import { Vacation } from './../vacation/vacation.interface';
import { VacationModel } from './../vacation/vacation.model';
import {NextFunction, Request, Response} from "express";
import express from "express";
import { followerModel } from "./followers.model";
import { Follower } from './follower.interface';
import { ObjectId } from 'mongodb';
import mongoDB from "mongodb";
import { User } from '../user/user';
const getFollowsForUser = async (req: Request, res: Response, next: NextFunction)=>{
    const userId: mongoDB.ObjectId = new ObjectId(`${req.params.id}`);
    console.log(userId);
    const followsVacation = await followerModel.find({userID: userId}).populate<{userID: User}>('userID').orFail();
    if(!followsVacation || followsVacation === null) return next();
    // const followsVacationArray : Follower[] = followsVacation.map((item: Follower)=>item);
    res.status(200).json({followsVacation});
}

const addFollowForUser = async (req: Request, res: Response, next: NextFunction)=>{
    const userID : mongoDB.ObjectId = new ObjectId(`${req.body.userID}`);
    const vacationID : mongoDB.ObjectId = new ObjectId(`${req.body.vacationID}`);
    await followerModel.create({"userID": userID, "vacationID": vacationID});
    res.sendStatus(204);
}

const deleteFollowForUser = async (req: Request, res: Response, next: NextFunction)=>{
    const userID : mongoDB.ObjectId = new ObjectId(`${req.body.userID}`);
    const vacationID : mongoDB.ObjectId = new ObjectId(`${req.body.vacationID}`);
    await followerModel.deleteOne({"userID": userID, "vacationID": vacationID});
    res.status(200).json({"msg":"You deleted your follow"})
}

export{
    getFollowsForUser,
    addFollowForUser,
    deleteFollowForUser
}