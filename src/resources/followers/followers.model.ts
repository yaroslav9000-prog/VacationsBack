import { VacationModel } from './../vacation/vacation.model';
import mongoose, { Schema, Types, model } from "mongoose";
import { userModel } from "../user/User.model";
import { Follower } from "./follower.interface";
import { dbConfig } from "../../utils/dbConfig";
const followerSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: userModel
    },
    vacationID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: VacationModel
    }
},{
    versionKey: false,
    collection: dbConfig.FOLLOWERS_COLLECTION,
})

// followerSchema.virtual("vacationName", {
//     ref: VacationModel,
//     localField: "vacations",
//     foreignField: "_id",
//     justOne: false
// })
// followerSchema.virtual("userID", {
//     ref: userModel,
//     localField: "userID",
//     foreignField: "_id",
//     justOne: true
// })

export const followerModel = mongoose.model<Follower>("Followers", followerSchema);