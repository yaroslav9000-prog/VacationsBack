//External dependencies
import express, {Request, Response} from "express";
import {MongoClient, ObjectId, Db} from "mongodb";
import axios from "axios";

import { VacationModel } from "../src/resources/vacation/vacation.model";
import { Vacation } from "../src/resources/vacation/vacation.interface";
import { addNewVacation, fetchVacations } from "../src/resources/vacation/vacation.controller";

export const vacationsRouter = express.Router();

vacationsRouter.use(express.json());

vacationsRouter.get('/', async(req: any, res: Response)=>{
    try{
        fetchVacations(req, res);
    }catch(e){
        console.log(`there is an error fetching your data ${e}`);
    }

})
vacationsRouter.post('/createVacation', async(req: Request, res: Response)=>{
    try{
        await addNewVacation(req, res);
    }catch(e){
        console.log(e);
        res.status(403).send({"msg": "something went wrong with your request, invalid form or something else"});
    }
})

vacationsRouter.delete('/deleteVacation', async(req: Request, res: Response)=>{
    
})