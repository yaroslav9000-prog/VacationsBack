import mongoose, { Schema, model } from "mongoose";
import { dbConfig } from "../../utils/dbConfig";
import {Role, User} from "./user";
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    pwd: String,
    role: String
}, {
    versionKey: false,
    toJSON: {virtuals: true},
    collection: dbConfig.USERS_COLLECTION});

export const userModel = mongoose.model<User>("User", UserSchema);