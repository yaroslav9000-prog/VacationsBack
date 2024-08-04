//External dependencies
import express, {Request, Response} from "express";
import {MongoClient, ObjectId, Db} from "mongodb";
import axios from "axios";

import { VacationModel } from "../src/resources/vacation/vacation.model";
import { Vacation } from "../src/resources/vacation/vacation.interface";

export const vacationsRouter = express.Router();

vacationsRouter.use(express.json());

vacationsRouter.get('/api/vacations', async(req: any, res: Response)=>{
    try{
        const data = await VacationModel.find({});
        console.log("You got your data there finally :)!!!");
        res.status(200).json(data);
    }catch(e){
        console.log(`there is an error fetching your data ${e}`);
    }

})
// vacationsRouter.post('api/createVacations', async(req: Request, res: Response)=>{
//     try{
//         const newVacation : Vacation = {req.body.vacaDestination, } 
//     }catch(e){
//         console.log(e);
//     }
// })