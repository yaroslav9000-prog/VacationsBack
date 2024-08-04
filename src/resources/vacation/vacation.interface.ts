//External dependencies
import {ObjectId} from "mongodb";
import mongoose, { Schema, Document } from "mongoose";

//Class
export interface Vacation extends Document{
    vacaDestination : string;
    vacaDescription: string;
    vacaStartDate: string;
    vacaEndDate: string;
    vacaPrice: number;
    imgName: string;

}
