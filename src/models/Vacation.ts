//External dependencies
import {ObjectId} from "mongodb";
import mongoose, { Schema } from "mongoose";

//Class
export class Vacation{
    public vacaDestination : string;
    public vacaDescription: string;
    public vacaStartDate: string;
    public vacaEndDate: string;
    public vacaPrice: number;
    public imgName: string;

    constructor(vacaDestination: string, vacaDescription: string, vacaStartDate: string, vacaEndDate: string, vacaPrice: number, imgName: string, public id?: ObjectId){
        this.vacaDestination = vacaDestination;
        this.vacaDescription = vacaDescription;
        this.vacaStartDate = vacaStartDate;
        this.vacaEndDate = vacaEndDate;
        this.vacaPrice = vacaPrice;
        this.imgName = imgName;
    }
}
