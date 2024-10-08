import express, {Request, Response, NextFunction} from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { serverConfigs } from "./src/utils/serverConfig";
import { vacationsRouter } from "./Routes/vacations";
import { dbConfig } from "./src/utils/dbConfig";
import { authRouter } from "./Routes/authRouter";
import { verifyJWT } from "./MiddleWare/verifyJWT";
import { refreshTokenRouter } from "./Routes/refreshRouter";
import { registerRouter } from "./Routes/registerRouter";
import { logOutRouter } from "./Routes/logout";
import { followersRouter } from "./Routes/followers";
// import jwt from "jsonwebtoken"
import cors from "cors";
import path from "node:path";
import { filesRouter } from "./Routes/filesRouter";
const server = express();


// let isAdmin = false;

const corsOptions = {
    origin: "*", //allow any origin
    methods: ["GET","POST", "DELETE"], //which methods i will allow
    allowedHeaders: ["Content-Type","Authorization"], //which headers i will get
    exposedHeaders: ["Authorization"] //which headers i will expose
}

// const serverCors = {
//     origin: "127.0.0.1",
//     methods: ["POST"],
//     allowedHeaders: ["Content-Type","Authorization"],
//     exposedHeaders: ["Authorization"]
// }

//My db
const connectToMongoDB = async ()=>{
    await mongoose.connect(dbConfig.DB_CONN_STRING);
    console.log("Yeah we did it, we connected mongoDB");
}

try{
    connectToMongoDB();
}catch(e){
    console.log(`WUah wuah we failed to connect captain. ${e}`);
}




server.use(express.json());

server.use(cors(corsOptions))

server.use(express.static(path.join("src", "public")));

server.use(fileUpload({createParentPath: true}))

server.use(express.urlencoded({extended: false}))

server.get("/",(req: Request, res: Response)=>{
    res.status(200).send("Hello world, again!!!")
})

server.use(cookieParser())

server.use('/api/register', registerRouter);

server.use("/api/login", authRouter)

server.use('/api/refresh', refreshTokenRouter);

server.use('/api/logout', logOutRouter);

server.use("/api/vacations",vacationsRouter);

server.use(verifyJWT);



server.use("/api/follows", followersRouter);

server.use("/api/files", filesRouter)

server.listen(serverConfigs.PORT, serverConfigs.HOST, ()=>{
    console.log(`server is up and running on port: ${serverConfigs.PORT}`);
})