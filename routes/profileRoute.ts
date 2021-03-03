import express, { Request, Response } from 'express';
import {profileController} from "../main"

export const profileRoutes = express.Router();


profileRoutes.post("/api/userLogin",async (req:Request,res:Response)=> await profileController.login(req,res))


profileRoutes.post("/api/createUser", async (req:Request, res:Response)=>{
    try{
        res.json(await profileController.postUser(req.body))

    }catch(err){
        console.error(err.message)
        res.status(502).json({message:"Internal Server Error"})
    }
})

profileRoutes.get("/api/userProfile/", async (req:Request, res:Response)=>{
    try{
        console.log(req.session)
        res.json(await profileController.getUser(req.session["userId"], false))    
    } catch(err){
        console.error(err.message)
        res.status(502).json({message:"Internal Server Error"})
    }
})

profileRoutes.put("/api/userProfile/", async (req:Request, res:Response)=>{
    try{
        const result = await profileController.putUser(req.session["userId"], req.body) 
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

profileRoutes.get("/api/doctorProfile/", async (req:Request, res:Response)=>{
    try{
        res.json(await profileController.getDoctor(req.session["doctorId"], false))    
    } catch(err){
        console.error(err.message)
        res.status(502).json({message:"Internal Server Error"})
    }
})

profileRoutes.put("/api/doctorProfile/", async (req:Request, res:Response)=>{
    try{
        res.json(await profileController.putDoctor(req.session["doctorId"], req.body))  
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
