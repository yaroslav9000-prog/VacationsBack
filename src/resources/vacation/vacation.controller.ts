import {Request, Response} from "express";
import { Vacation } from "./vacation.interface";
import { VacationModel } from "./vacation.model";
import { ObjectId } from "mongodb";
import * as mongoDB from "mongodb";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path"; 
import fileUpload from "express-fileupload";
import { followerModel } from "../followers/followers.model";

const imagePath = path.join(__dirname, "..", "..", "public", "images");

const fetchVacations = async (req: Request, res: Response) =>{
    const data = await VacationModel.find({});
    const allVacations = data.map(item=> item);
    console.log("I brought you vacation data :)!!!");
    res.status(200).json({"vacations":allVacations});
}

const deleteVacation = async (req: Request, res: Response)=>{
    const vacationId = req.params.id;
    const id : mongoDB.ObjectId = new ObjectId(`${vacationId}`);
    const oldVacation = await VacationModel.findOne({_id: id});
    console.log(vacationId);
    await fs.unlink(path.join(imagePath, oldVacation!.imageName),(err)=>{
        console.log(err);
    })
    await VacationModel.deleteOne({_id: id});
    await followerModel.deleteMany({_id: id});
    res.json({"deletedVacationId": vacationId});
}

const editVacation = async(req: Request, res: Response)=>{
    const vacationID = req.params.id;
    const bodyObject = req.body;
    const oldObject = await VacationModel.findOne({_id: vacationID});
    const imageFolderPath = path.join(__dirname, "..", "..", "public", "images");

    console.log(req.files);
    if(req.files){
        const imageFile = req.files[`uploaded_image[]`] as fileUpload.UploadedFile;
        const imageName = imageFile.name ;
        const id :mongoDB.ObjectId = new ObjectId(`${vacationID}`);
        const filePath = path.join(__dirname, "..","..","public", "images", imageName);
        
        await fs.unlink(path.join(imageFolderPath, oldObject!.imageName), (err)=>{
            console.log(err)
        })
        console.log("not here")
        await imageFile.mv(filePath, (e)=>{
            console.log(e);
        }); 
        console.log("not here")
        await VacationModel.findByIdAndUpdate({_id: id}, {$set: {
            vacationDestination: bodyObject.vacationDestination,
            vacationDescription: bodyObject.vacationDescription,
            startDateVacation: bodyObject.startDateVacation,
            endDateVacation: bodyObject.endDateVacation,
            vacationPrice: bodyObject.vacationPrice,
            imageName: imageName
    }})    
    }else{
        
        const id :mongoDB.ObjectId = new ObjectId(`${vacationID}`);
        await VacationModel.findByIdAndUpdate({_id: id}, {$set: {
            vacationDestination: bodyObject.vacationDestination,
            vacationDescription: bodyObject.vacationDescription,
            startDateVacation: bodyObject.startDateVacation,
            endDateVacation: bodyObject.endDateVacation,
            vacationPrice: bodyObject.vacationPrice,
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