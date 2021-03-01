import {questionnaireController} from "../main"
import express, { Request, Response } from 'express';


export const questionnaireRoutes = express.Router();

questionnaireRoutes.post("/api/createUserQuestionnaire", async (req:Request, res:Response)=>{
    try{
        res.json(await questionnaireController.postQuestionnaire(req, res))

    }catch(err){
        console.error(err.message)
        res.status(502).json({message:"Internal Server Error"})
    }
})