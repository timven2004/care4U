import {profileController} from "../main"
import express, { Request, Response } from 'express';

export const profileRoutes = express.Router();


profileRoutes.post("/api/createUser", async (req:Request, res:Response)=>{
    try{
        res.json(await profileController.postUser(req.body))

    }catch(err){
        console.error(err.message)
        res.status(502).json({message:"Internal Server Error"})
    }
})

profileRoutes.get("/api/userProfile/:id", async (req:Request, res:Response)=>{
    try{
        const idString=req.session["userId"]||req.params.id
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
        const result = await profileController.putUser(id, req.body) 
        res.json(result)
    } catch(err){
        console.error(err.message)
        res.status(502).json({message:"Internal Server Error"})
    }
})

profileRoutes.post("/api/createDoctor", async (req:Request, res:Response)=>{
    try{
        res.json(await profileController.postDoctor(req.body))

    }catch(err){
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
        res.json(await profileController.putDoctor(id, req.body))  
    } catch(err){
        console.error(err.message)
        res.status(502).json({message:"Internal Server Error"})
    }
})