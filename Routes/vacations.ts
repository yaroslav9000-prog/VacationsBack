//External dependencies
import express, {Request, Response} from "express";
import {MongoClient, ObjectId, Db} from "mongodb";
import axios from "axios";
import { VacationModel } from "../src/resources/vacation/vacation.model";
import { Vacation } from "../src/resources/vacation/vacation.interface";
import { deleteVacation, editVacation, fetchVacations, getNotStarted, getStarted } from "../src/resources/vacation/vacation.controller";
import fileUpload from "express-fileupload";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import {format} from "date-fns";
import { getBeautifulReport, getVacationsReport } from "../src/resources/followers/follower.controller";


export const vacationsRouter = express.Router();
// vacationsRouter.use(fileUpload());
const uploadDir = path.join(__dirname, '..', 'src', 'images');


vacationsRouter.get('/', async(req: any, res: Response)=>{
    try{
        fetchVacations(req, res);
    }catch(e){
        console.log(`there is an error fetching your data ${e}`);
    }

})
vacationsRouter.get('/vacationReport', async(req: any, res: Response)=>{
    try{
        getVacationsReport(req, res);
    }catch(e){
        console.log(`there is an error fetching your data ${e}`);
    }

})
vacationsRouter.get('/vacationReportB', async(req: any, res: Response)=>{
    try{
        getBeautifulReport(req, res);
    }catch(e){
        console.log(`there is an error fetching your data ${e}`);
    }

})
vacationsRouter.post('/addVacation',async(req: Request, res: Response)=>{
    try {
        const uploadDir = path.join(__dirname, "..", "src" ,"public", "images");
        console.log('Request body:', req.body);
        
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        if (!req.files || Object.values(req.files).length === 0) {
            return res.status(400).json({ "msg": "No image file was uploaded" });
        }
        console.log('Image File:', req.files[`uploaded_image[]`]);

        const [ vacationDestination, startDateVacation, endDateVacation, vacationDescription, vacationPrice  ] = Object.values(req.body);
        
        
        const imageFile = req.files[`uploaded_image[]`] as fileUpload.UploadedFile;
        
        const filename = imageFile.name + path.extname(imageFile.name);
        const filepath = path.join(uploadDir, filename);

        await imageFile.mv(filepath, (e)=>{
            console.log(e);
        })
        
        const imageUrl = `${imageFile.name}`;

        const newVacation = {
            _id: new ObjectId(),
            vacationDestination: vacationDestination, 
            vacationDescription: vacationDescription, 
            startDateVacation: startDateVacation, 
            endDateVacation: endDateVacation,
            vacationPrice: vacationPrice, 
            imageName: imageUrl
        };

        // Save to database
        await VacationModel.create(newVacation);


        res.status(201).json({
            "msg": "New vacation was successfully added!",
            "vacation": newVacation
        });
    } catch (e) {
        console.error(e);
        if (e instanceof mongoose.Error.ValidationError) {
            
            const errors = Object.values(e.errors).map(err => err.message);
            return res.status(400).json({ "msg": "Validation error", errors });
        }
        res.status(500).json({ "msg": "Something went wrong with your request" });
    }
})

vacationsRouter.delete('/deleteVacation/:id', async(req: Request, res: Response)=>{
    try{
        deleteVacation(req, res);
    }catch(err){
        res.status(400).json({"msg": "no such vacation to delete"})
    }    
})
vacationsRouter.post('/editVacation/:id', async(req: Request, res: Response)=>{
    try{
        editVacation(req, res);
    }catch(err){
        res.sendStatus(500);
    }
})
vacationsRouter.get('/notStarted', async(req: Request, res: Response)=>{
    try{
        getNotStarted(req, res)
    }catch(err){
        console.log(err);
    }
})
vacationsRouter.get('/started', async(req: Request, res: Response)=>{
    try{
        getStarted(req, res);
    }catch(err){
        console.log(err);
    }
})