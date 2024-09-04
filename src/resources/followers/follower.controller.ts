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
    const allFollowers = (await followerModel.find().populate("vacationID")).map((item: Follower)=> item);
    const allVacations = (await VacationModel.find()).map((item: Vacation)=> item)
    if(!followsVacation || followsVacation === null) return next();
    // const followsVacationArray : Follower[] = followsVacation.map((item: Follower)=>item);
    res.status(200).json({"userFollows":followsVacation, "allFollows": allFollowers, "vacations": allVacations});
}

const addFollowForUser = async (req: Request, res: Response,next: NextFunction)=>{
    try{
        console.log(req.body.data);
        console.log(req.body);
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

export const getVacationsReport = async (req: Request, res: Response)=>{
    const report = (await VacationModel.aggregate([{$lookup: {from: "Followers", localField: "_id", foreignField: "vacationID", as: "followers"}}, {$project: {_id: 1, "vacationDestination": 1, "followers": 1}}])).map(item=> item);
    res.status(200).json({"theReport": report});
}
export const getBeautifulReport = async (req: Request, res: Response)=>{
    const report = (await VacationModel.aggregate([{$lookup: {from: "Followers", localField: "_id", foreignField: "vacationID", as: "followers"}}, {$project: {_id: 0, "vacationDestination": 1, "followers": 1}}])).map(item=> item);
    res.status(200).json({"theReport": report});
}

export{
    getFollowsForUser,
    addFollowForUser,
    deleteFollowForUser
}