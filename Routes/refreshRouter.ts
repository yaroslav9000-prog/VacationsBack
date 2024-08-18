import {Request, Response} from "express";
import express from "express";
import { handleRefreshToken } from "../Controllers/refreshToken.controller";
export const refreshTokenRouter = express.Router();

refreshTokenRouter.get('/', handleRefreshToken);