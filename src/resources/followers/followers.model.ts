import { VacationModel } from './../vacation/vacation.model';
import mongoose, { Schema, Types, model } from "mongoose";
import { userModel } from "../user/User.model";
import { Follower } from "./follower.interface";
import { dbConfig } from "../../utils/dbConfig";
const followerSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true,
        ref: userModel
    },
    vacationsID: {
        type: Schema.Types.ObjectId,
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
//     localField: "userId",
//     foreignField: "_id",
//     justOne: true
// })

export const followerModel = mongoose.model<Follower>("Followers", followerSchema);