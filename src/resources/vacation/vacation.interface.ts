//External dependencies
import {ObjectId} from "mongodb";
import mongoose, { Schema, Document } from "mongoose";

//Class
export interface Vacation extends Document{
    vacationDestination : string;
    vacationDescription: string;
    startDateVacation: string;
    endDateVacation: string;
    vacationPrice: number;
    imageName: string;

}
