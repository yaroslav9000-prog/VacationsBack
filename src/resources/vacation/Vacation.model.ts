import { Vacation } from './vacation.interface';
import mongoose, { Schema, model } from "mongoose";
import { dbConfig } from "../../utils/dbConfig";

const VacationSchema = new mongoose.Schema ({
    vacaDestination: {
        type: String,
        required: true
    },
    vacaDescription: {
        type: String, 
        required: true
        
    },
    vacaStartDate: {
        type: String, 
        required: true
        
    },
    vacaEndDate: {
        type: String, 
        required: true
        
    },
    vacaPrice: {
        type: String, 
        required: true
        
    },
    imgName: {
        type: String, 
        required: true   
    }
     
}, {collection: dbConfig.VACATIONS_COLLECTION})

export const VacationModel = mongoose.model<Vacation>('Vacation', VacationSchema);

