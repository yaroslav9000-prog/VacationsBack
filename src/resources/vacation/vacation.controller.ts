import {Request, Response} from "express";
import { Vacation } from "./vacation.interface";
import { VacationModel } from "./vacation.model";
import { ObjectId } from "mongodb";
import * as mongoDB from "mongodb";

const addNewVacation = async(req: Request, res: Response)=>{
    const newVacation: Vacation = {...req.body};
    console.log(newVacation);
    await VacationModel.create(newVacation);
    res.status(200).send({"msg": "new vacation was successfully added!"});
}
const fetchVacations = async (req: Request, res: Response) =>{
    const data = await VacationModel.find({});
    console.log("You got your data there finally :)!!!");
    res.status(200).json(data);
}

const deleteVacation = async (req: Request, res: Response)=>{
    const vacationId = req.body.id;
    const id : mongoDB.ObjectId = new ObjectId(`${vacationId}`);
    await VacationModel.deleteOne({_id: id})
}



export {
    addNewVacation,
    fetchVacations,
    deleteVacation
}