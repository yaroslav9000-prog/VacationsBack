//External dependencies
import express, {Request, Response} from "express";
import {MongoClient, ObjectId, Db} from "mongodb";
import { Vacation } from "../src/models/Vacation";
import axios from "axios";

import { VacationModel } from "../src/mongoDB/models/Vacation.model";

export const vacationsRouter = express.Router();

vacationsRouter.use(express.json());

vacationsRouter.get('/vacations', async(req: any, res: Response)=>{
    try{
        const data = await VacationModel.find({});
        console.log("You got your data there finally :)!!!");
        res.status(200).json(data);
    }catch(e){
        console.log(`there is an error fetching your data ${e}`);
    }

})
