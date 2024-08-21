import {Response, Request, NextFunction} from "express";
import express from "express";

const pictureAggregation = (req: Request, res: Response, next: NextFunction)=>{
    if(!req.files || Object.keys(req.files).length === 0){
        res.status(400).json({"msg": "no files were added to the request"});
        return;
    }
}