import {profileController} from "../main"
import express, { Request, Response } from 'express';

export const profileRoutes = express.Router();

profileRoutes.get("/api/getUserProfile", async (req:Request, res:Response)=>{
    try{
        const id=1
        res.json(await profileController.getUser(id, false))    
    } catch(err){
        console.error(err.message)
        res.status(502).json({message:"Internal Server Error"})
    }
})