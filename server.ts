import express, {Request, Response, NextFunction} from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import { serverConfigs } from "./src/utils/serverConfig";
import { vacationsRouter } from "./Routes/vacations";
import { dbConfig } from "./src/utils/dbConfig";
import { userRouter } from "./Routes/user";
// import jwt from "jsonwebtoken";

const server = express();


// let isAdmin = false;

// const corsOptions = {
//     origin: "*", //allow any origin
//     methods: ["GET","POST"], //which methods i will allow
//     allowedHeaders: ["Content-Type","Authorization"], //which headers i will get
//     exposedHeaders: ["Authorization"] //which headers i will expose
// }

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

server.use(express.static("upload"));

server.use(fileUpload({createParentPath: true}))

server.use(express.urlencoded({extended: false}))

server.get('/api',(req: Request, res: Response)=>{
    res.status(200).send("Hello world, again!!!")
})
server.use(vacationsRouter);

server.use(userRouter)

server.listen(serverConfigs.PORT, serverConfigs.HOST, ()=>{
    console.log(`server is up and running on port: ${serverConfigs.PORT}`);
})