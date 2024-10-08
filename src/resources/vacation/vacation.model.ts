import { Vacation } from './vacation.interface';
import mongoose, { Schema, model } from "mongoose";
import { dbConfig } from "../../utils/dbConfig";
import { followerModel } from '../followers/followers.model';

const VacationSchema = new mongoose.Schema ({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    vacationDestination: {
        type: String,
        required: true
    },
    vacationDescription: {
        type: String, 
        required: true
        
    },
    startDateVacation: {
        type: String, 
        required: true
        
    },
    endDateVacation: {
        type: String, 
        required: true
        
    },
    vacationPrice: {
        type: Number, 
        required: true,
        max: 10000,
        min: 0  
    },
    imageName: {
        type: String, 
        required: true   
    }
    
     
}, {    versionKey: false,
        toJSON: {virtuals: true},
        collection: dbConfig.VACATIONS_COLLECTION})

export const VacationModel = mongoose.model<Vacation>('Vacation', VacationSchema);

