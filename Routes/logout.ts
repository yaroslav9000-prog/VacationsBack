import {Request, Response} from "express";
import express from "express";
import { handleLogout } from "../Controllers/logout.controller";

export const logOutRouter = express.Router();

logOutRouter.get("/", handleLogout);