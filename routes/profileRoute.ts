import {profileController} from "../main"
import express, { Request, Response } from 'express';

export const profileRoutes = express.Router();


profileRoutes.post("/api/userLogin", profileController.login)


profileRoutes.post("/api/createUser", async (req:Request, res:Response)=>{
    try{
        res.json(await profileController.postUser(req.body))

    }catch(err){
        console.error(err.message)
        res.status(502).json({message:"Internal Server Error"})
    }
})

profileRoutes.get("/api/userProfile/:userId", async (req:Request, res:Response)=>{
    try{
        const idString=req.session["userId"]||req.params.userId
        const id = parseInt(idString)
        res.json(await profileController.getUser(id, false))    
    } catch(err){
        console.error(err.message)
        res.status(502).json({message:"Internal Server Error"})
    }
})

profileRoutes.put("/api/userProfile/:userId", async (req:Request, res:Response)=>{
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


profileRoutes.get("/api/userLogout", async (req:Request, res:Response)=>{
    try{
        const idString=req.params.id
        const id = parseInt(idString)
        res.json(await profileController.getUser(id, req.body))  
    } catch(err){
        console.error(err.message)
        res.status(502).json({message:"Internal Server Error"})
    }
    
})


profileRoutes.post("/api/doctorLogin", async (req:Request, res:Response) =>{
    try{
        res.json(await profileController.postDoctor(req.body))

    }catch(err){
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

profileRoutes.get("/api/doctorProfile/:doctorId", async (req:Request, res:Response)=>{
    try{
        const idString=req.params.id
        const id = parseInt(idString)
        res.json(await profileController.getDoctor(id, false))    
    } catch(err){
        console.error(err.message)
        res.status(502).json({message:"Internal Server Error"})
    }
})

profileRoutes.put("/api/doctorProfile/:doctorId", async (req:Request, res:Response)=>{
    try{
        const idString=req.params.id
        const id = parseInt(idString)
        res.json(await profileController.putDoctor(id, req.body))  
    } catch(err){
        console.error(err.message)
        res.status(502).json({message:"Internal Server Error"})
    }
    
})


profileRoutes.get("/api/doctorLogout", async (req:Request, res:Response)=>{
    try{
        const idString=req.params.id
        const id = parseInt(idString)
        res.json(await profileController.getDoctor(id, req.body))  
    } catch(err){
        console.error(err.message)
        res.status(502).json({message:"Internal Server Error"})
    }
    
})
