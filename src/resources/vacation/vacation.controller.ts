import {Request, Response} from "express";
import { Vacation } from "./vacation.interface";
import { VacationModel } from "./vacation.model";
import { ObjectId } from "mongodb";
import * as mongoDB from "mongodb";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path"; 
import fileUpload from "express-fileupload";

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
    res.send(200).json({"deletedVacationId": vacationId});
}

const editVacation = async(req: Request, res: Response)=>{
    const vacationID = req.params.id;
    const bodyObject = req.body;
    const oldObject = await VacationModel.findOne({_id: vacationID});
    const imageFolderPath = path.join(__dirname, "..", "..", "public", "images");

    console.log(req.files);
    if(req.files){
        const imageFile = req.files[`uploaded_image[]`] as fileUpload.UploadedFile;
        const imageName = bodyObject.vacationDestination + path.extname(imageFile.name);
        const id :mongoDB.ObjectId = new ObjectId(`${vacationID}`);
        
        
        fs.unlink(path.join(imageFolderPath, oldObject!.imageName), (err)=>{
            throw err;
        })
        imageFile.mv(path.join(imageFolderPath, imageName)); 
        
        await VacationModel.findByIdAndUpdate({_id: id}, {$set: {
            vacationDestination: bodyObject.vacationDestination,
            vacationDescription: bodyObject.vacationDescription,
            startDateVacation: bodyObject.startDateVacation,
            endDateVacation: bodyObject.endDateVacation,
            vacationPrice: bodyObject.vacationPrice,
            imageName: bodyObject.vacationDestination
    }})    
    }else{
        fs.rename(path.join(imageFolderPath, oldObject!.imageName), path.join(imageFolderPath, bodyObject.vacationDestination), (err)=>{console.log(err)})
        const id :mongoDB.ObjectId = new ObjectId(`${vacationID}`);
        await VacationModel.findByIdAndUpdate({_id: id}, {$set: {
            vacationDestination: bodyObject._vacationDestination,
            vacationDescription: bodyObject._vacationDescription,
            startDateVacation: bodyObject._startDateVacation,
            endDateVacation: bodyObject._endDateVacation,
            vacationPrice: bodyObject._vacationPrice,
            imageName: bodyObject._imageName
        }})
        
    }
    const updatedVacation = await VacationModel.findOne({_id: vacationID});
    
    res.status(200).json({"updatedVacation": updatedVacation});
}


export {
    fetchVacations,
    deleteVacation,
    editVacation
}