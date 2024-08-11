import mongoose, { Schema, model } from "mongoose";
import { dbConfig } from "../../utils/dbConfig";
import {Role, User} from "./user";
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: [2, "minimum length for name is 2 characters"],
        required: true
    },
    lastName: {
        type: String,
        minLength: [2, "minimum length for last name is 2 characters"],
        required: true
    },
    email: {
        type: String,
        minLength: [3, "minimum length for email is 3 characters"],
        required: true
    },
    pwd: {
        type: String,
        minLength: [4, "minimum length for password is 4 characters"],
        required: true
    },
    role: String
}, {
    virtuals:{
        getUserId: {get(){
            return this._id
        }}
    },
    versionKey: false,
    toJSON: {virtuals: true},
    collection: dbConfig.USERS_COLLECTION});

export const userModel = mongoose.model<User>("Users", UserSchema);