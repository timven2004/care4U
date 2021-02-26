import {profileController} from "../main"
import express, { Request, Response } from 'express';

export const profileRoutes = express.Router();

profileRoutes.get("/api/userProfile/:id", async (req:Request, res:Response)=>{
    try{
        const idString=req.params.id
        const id = parseInt(idString)
        res.json(await profileController.getUser(id, false))    
    } catch(err){
        console.error(err.message)
        res.status(502).json({message:"Internal Server Error"})
    }
})

profileRoutes.put("/api/userProfile/:id", async (req:Request, res:Response)=>{
    try{
        const idString=req.params.id
        const id = parseInt(idString)
        await profileController.putUser(id, req.body)   
    } catch(err){
        console.error(err.message)
        res.status(502).json({message:"Internal Server Error"})
    }
})

profileRoutes.get("/api/doctorProfile/:id", async (req:Request, res:Response)=>{
    try{
        const idString=req.params.id
        const id = parseInt(idString)
        res.json(await profileController.getDoctor(id, false))    
    } catch(err){
        console.error(err.message)
        res.status(502).json({message:"Internal Server Error"})
    }
})

profileRoutes.put("/api/doctorProfile/:id", async (req:Request, res:Response)=>{
    try{
        const idString=req.params.id
        const id = parseInt(idString)
        await profileController.putUser(id, req.body)   
    } catch(err){
        console.error(err.message)
        res.status(502).json({message:"Internal Server Error"})
    }
})