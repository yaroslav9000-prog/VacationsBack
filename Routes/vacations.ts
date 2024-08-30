//External dependencies
import express, {Request, Response} from "express";
import {MongoClient, ObjectId, Db} from "mongodb";
import axios from "axios";
import { VacationModel } from "../src/resources/vacation/vacation.model";
import { Vacation } from "../src/resources/vacation/vacation.interface";
import { deleteVacation, editVacation, fetchVacations } from "../src/resources/vacation/vacation.controller";
import { verifyJWT } from "../MiddleWare/verifyJWT";
import fileUpload from "express-fileupload";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";


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
vacationsRouter.post('/addVacation',async(req: Request, res: Response)=>{
    try {
        const uploadDir = path.join(__dirname, '..', 'src', 'images');
        console.log('Request body:', req.body);
        // console.log('Request files:', req.files.newVacation);
        
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        if (!req.files || Object.values(req.files).length === 0) {
            return res.status(400).json({ "msg": "No image file was uploaded" });
        }
        console.log('Image File:', req.files);

        const [ vacationDestination, startDateVacation, endDateVacation, vacationDescription, vacationPrice  ] = Object.values(req.body);
        
        
        const imageFile = req.files.imageFile as fileUpload.UploadedFile;
        // console.log("image file:", imageFile)
        // Generate a unique filename
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // const filename = uniqueSuffix + path.extname(imageFile.name);
        // const filepath = path.join(uploadDir);

        // Move the file to the upload directory
        // await imageFile.mv(filepath);
        // await imageFile.mv(uploadDir);
        const buffer = imageFile.data;
        fs.writeFile(filename, buffer, (err) => {
            if (err) {
                console.error('Error saving file:', err);
                return;
            }
            console.log('File saved successfully:', filename);
        });
        

        // Generate URL for the uploaded image
        const imageUrl = `/images/${imageFile.name}`;

        // Create new vacation object
        const newVacation = {
            vacationDestination: vacationDestination, 
            vacationDescription: vacationDescription, 
            startDateVacation: startDateVacation, 
            endDateVacation: endDateVacation,
            vacationPrice: vacationPrice, 
            imageUrl: imageUrl
        };

        // Save to database
        const savedVacation = await VacationModel.create(newVacation);

        res.status(201).json({
            "msg": "New vacation was successfully added!",
            "vacation": savedVacation
        });
    } catch (e) {
        console.error(e);
        if (e instanceof mongoose.Error.ValidationError) {
            // Handle Mongoose validation errors
            const errors = Object.values(e.errors).map(err => err.message);
            return res.status(400).json({ "msg": "Validation error", errors });
        }
        res.status(500).json({ "msg": "Something went wrong with your request" });
    }
})

vacationsRouter.delete('/deleteVacation', async(req: Request, res: Response)=>{
    try{
        deleteVacation(req, res);
    }catch(err){
        res.status(400).json({"msg": "no such vacation to delete"})
    }    
})
vacationsRouter.post('/editVacation', async(req: Request, res: Response)=>{
    try{
        editVacation(req, res);
    }catch(err){
        res.sendStatus(500);
    }
})