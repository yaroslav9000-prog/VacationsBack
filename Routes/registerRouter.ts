import { Types } from 'mongoose';
import {Response, Request, NextFunction} from "express";
import { User } from "../src/resources/user/user";
import express from "express";
import { userModel } from "../src/resources/user/User.model";
import { handleNewUser } from '../Controllers/register';

export const registerRouter = express.Router();

registerRouter.post('/', handleNewUser);