import { Vacation } from './../vacation/vacation.interface';
import { VacationModel } from './../vacation/vacation.model';
import {NextFunction, Request, response, Response} from "express";
import express from "express";
import { followerModel } from "./followers.model";
import { Follower } from './follower.interface';
import { ObjectId } from 'mongodb';
import mongoDB from "mongodb";
import { User } from '../user/user';
import { AxiosRequestConfig } from 'axios';
const getFollowsForUser = async (req: Request, res: Response, next: NextFunction)=>{
    const userId: mongoDB.ObjectId = new ObjectId(`${req.params.id}`);
    console.log(userId);
    const followsVacation = (await followerModel.find({userID: userId})).map((item: Follower)=> item);
    const allFollowers = (await followerModel.find()).map((item: Follower)=> item);
    if(!followsVacation || followsVacation === null) return next();
    // const followsVacationArray : Follower[] = followsVacation.map((item: Follower)=>item);
    res.status(200).json({"userFollows":followsVacation, "allFollows": allFollowers});
}

const addFollowForUser = async (req: Request, res: Response,next: NextFunction)=>{
    try{
        console.log(req.body.data);
    const userID: string = req.body.data.userID;
    const vacationID: string = req.body.data.vacationID;
    const userID_to_add : mongoDB.ObjectId = new ObjectId(userID);
    const vacationID_to_add : mongoDB.ObjectId = new ObjectId(vacationID);
    await followerModel.create({"userID": userID_to_add, "vacationID": vacationID_to_add});
    const responseUser = await followerModel.findOne({"userID": userID, "vacationID": vacationID});
    console.log(responseUser);
    res.status(200).json({"addedFollow": responseUser});}
    catch(err){
        console.log(err);
    }
}

const deleteFollowForUser = async (req: Request, res: Response, next: NextFunction)=>{
    console.log(req);

    // console.log(req.query)
    const userID_to_delete: string = req.body.userID;
    const vacationID_to_delete: string = req.body.vacationID;
    const userID : mongoDB.ObjectId = new ObjectId(userID_to_delete);
    const vacationID : mongoDB.ObjectId = new ObjectId(vacationID_to_delete);
    const deletedFollower = await followerModel.findOne({"userID": userID, "vacationID": vacationID});
    await followerModel.deleteOne({"userID": userID, "vacationID": vacationID});
    res.status(200).json({"deletedFollow": deletedFollower});
}

export{
    getFollowsForUser,
    addFollowForUser,
    deleteFollowForUser
}