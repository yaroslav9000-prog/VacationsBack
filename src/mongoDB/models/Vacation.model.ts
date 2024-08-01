import mongoose, { Schema } from "mongoose";
import { dbConfig } from "../../utils/dbConfig";

const VacationSchema = new mongoose.Schema ({
    vacaDestination: String,
    vacaDescription: String,
    vacaStartDate: String,
    vacaEndDate: String,
    vacaPrice: Number,
    imgName: String
     
}, {collection: dbConfig.VACATIONS_COLLECTION})

export const VacationModel = mongoose.model('Vacation', VacationSchema);

