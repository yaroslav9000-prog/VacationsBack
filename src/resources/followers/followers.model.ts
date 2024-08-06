import mongoose, { Schema, Types, model } from "mongoose";
import { userModel } from "../user/User.model";
import { Follower } from "./follower.interface";
const followerSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true
    },
    vacations: {
        type: [{vacationId: Types.ObjectId}]
    }
})

export const followerModel = mongoose.model<Follower>("Follower", followerSchema);