import {Request, Response} from "express";
import { Vacation } from "./vacation.interface";
import { VacationModel } from "./vacation.model";
import { ObjectId } from "mongodb";
import * as mongoDB from "mongodb";
import fsPromises from "fs/promises";
import path from "path"; 
import fileUpload from "express-fileupload";

const multer = require('multer');
const upload = multer({dest: 'images/'});
const addNewVacation = async(req: Request, res: Response)=>{

    if(!req.files || Object.keys(req.files).length ===0){
        res.status(400).json({"msg":"no file was attached"});
    }


    
    // fsPromises.
    // to screen a picture a need a path to it.
    //How to store it?
    //Probably best to be in images folder of my api
    // await VacationModel.create(newVacation);
    console.log(req.headers['Authorization']);
    res.status(200).send({"msg": "new vacation was successfully added!"});
}
const fetchVacations = async (req: Request, res: Response) =>{
    const data = await VacationModel.find({});
    const allVacations = data.map(item=> item);
    console.log("I brought you vacation data :)!!!");
    res.status(200).json({"vacations":allVacations});
}

const deleteVacation = async (req: Request, res: Response)=>{
    const vacationId = req.body.id;
    const id : mongoDB.ObjectId = new ObjectId(`${vacationId}`);
    await VacationModel.deleteOne({_id: id})
    res.send(200).json({"msg": "vacation deleted"});
}

const editVacation = async(req: Request, res: Response)=>{
    const bodyObject = req.body;
    const id :mongoDB.ObjectId = new ObjectId(`${bodyObject._vacationID}`);
    await VacationModel.findByIdAndUpdate({_id: id}, {$set: {
        vacationDestination: bodyObject._vacationDestination,
        vacationDescription: bodyObject._vacationDescription,
        startDateVacation: bodyObject._startDateVacation,
        endDateVacation: bodyObject._endDateVacation,
        vacationPrice: bodyObject._vacationPrice,
        imageName: bodyObject._imageName
    }})
    res.status(204).json({msg: "you updated your vacation successfully"});
}


export {
    addNewVacation,
    fetchVacations,
    deleteVacation,
    editVacation
}