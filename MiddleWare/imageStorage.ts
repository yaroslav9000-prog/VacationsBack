// import { path } from 'path';
//'path' can only be imported by turning on the 'esModuleInterop' flag and using a default import
//Solution: import thing = require("thing")
//Solution2: import * as thing from 'module';
import * as path from "path";
import {Response, Request, NextFunction} from "express";
import express from "express";
import fileUpload, { UploadedFile } from "express-fileupload";


export const pictureAggregation = (req: Request, res: Response, next: NextFunction)=>{
    if(!req.files || Object.keys(req.files).length === 0){
        res.status(400).json({"msg": "no files were added to the request"});
        return;
    }
    const uploadPath = path.join(__dirname,"..","src","images");
    const theImage = req.files.image as UploadedFile;
    const nameOfImage = req.body.vacationDestination;
    theImage["name"] = nameOfImage ;
    try{
        theImage.mv(uploadPath, (err)=>{
            if(err) return res.status(500).send(err);
            res.send("File uploaded to " + uploadPath);
        })
    }catch(err){
        console.log(err);
    }
}