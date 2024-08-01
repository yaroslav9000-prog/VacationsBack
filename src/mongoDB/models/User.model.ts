import mongoose, { Schema } from "mongoose";
import { dbConfig } from "../../utils/dbConfig";
import {Role} from "../../models/User";
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    pwd: String,
    role: Role
})