import express, {Request, Response} from "express";
import { VacationModel } from "../src/resources/vacation/vacation.model";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { WriteStream } from "tty";
import { stringify } from "csv-stringify";
export const filesRouter = express.Router();
const csv = require('csvtojson');
const theData = [["Vacation", "Followers"]];
const writingPath = path.join(__dirname, "..", "src", "files")

const csvParser = require("csvtojson").Parser;

filesRouter.get("/csv", async(req: Request, res: Response)=>{
    const report = (await VacationModel.aggregate([{$lookup: {from: "Followers", localField: "_id", foreignField: "vacationID", as: "followers"}}, {$project: {_id: 0, "vacationDestination": 1, "followers": 1}}])).map(item=> item);

    for(let index = 0; index < report.length; index++){
        theData.push([`${report[index].vacationDestination}`, `${report[index].followers.length}`])
      }
      const joinedTable= theData.map(item=>item.join(","));
      let finalChapter = '';
      for(let index= 0; index < joinedTable.length; index++){
        console.log(index)
        finalChapter += `${joinedTable[index]}\n`;
      }
      console.log(finalChapter);
    await fs.writeFile(path.join(writingPath, "report.csv"), finalChapter, (err)=>{
        console.log(err)
    });
    try{
        res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=report.csv');
            res.status(200).sendFile(path.join(writingPath, "report.csv"));
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    // res.sendFile(path.join(writingPath, "report.csv"));
    })
// filesRouter.get("/xlsx", async(req: Request, res: Response)=>{
//     const report = (await VacationModel.aggregate([{$lookup: {from: "Followers", localField: "_id", foreignField: "vacationID", as: "followers"}}, {$project: {_id: 0, "vacationDestination": 1, "followers": 1}}])).map(item=> item);

//     for(let index = 0; index < report.length; index++){
//         theData.push([report[index].vacationDestination, report[index].followers.length])
//       }
//     const joinedTable= theData.map(item=>item.join(","));
    
//     let finalChapter = '';
    
//     for(let index= 0; index < joinedTable.length; index++){
//         console.log(index)
//         finalChapter += `${joinedTable[index]}\n`;
//     }

//     await fs.writeFile(path.join(writingPath, "report.xlsx"), finalChapter, (err)=>{
//         console.log(err)
//     })
//     try{
//     res.setHeader('Content-Type', 'text/csv');
//         res.setHeader('Content-Disposition', 'attachment; filename=report.csv');
//         res.send(finalChapter);
//     } catch (error) {
//         res.status(500).json({ message: (error as Error).message });
//     }

//     // res.sendFile(path.join(writingPath, "report.xlsx"))
//     })

