import express, { Request, Response } from 'express';
import { isLoggedInUSERAPI, isLoggedInDOCAPI } from '../guard';
import {profileController} from "../main"

export const profileRoutes = express.Router();


profileRoutes.post("/api/userLogin",async (req:Request,res:Response)=> await profileController.userLogin(req,res))

profileRoutes.get("/api/userLogin", isLoggedInUSERAPI, async (req:Request,res:Response)=> await profileController.checkUserLogin(req,res))

profileRoutes.post("/api/createUser", async (req:Request, res:Response)=> await profileController.postUser(req, res))


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


profileRoutes.get("/api/userLogout", async (req:Request, res:Response)=> await profileController.userLogout(req, res))


profileRoutes.post("/api/doctorLogin",async (req:Request,res:Response)=> await profileController.doctorLogin(req,res))


profileRoutes.get("/api/doctorLogin", isLoggedInDOCAPI, async (req:Request,res:Response)=> await profileController.checkDoctorLogin(req,res))


profileRoutes.post("/api/createDoctor", async (req:Request, res:Response)=> await profileController.postDoctor(req, res))
// profileRoutes.post("/api/createDoctor", async (req:Request, res:Response)=>{
//     try{
//         res.json(await profileController.postDoctor(req.body))

//     }catch(err){
//         console.error(err.message)
//         res.status(502).json({message:"Internal Server Error"})
//     }
// })

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


profileRoutes.get("/api/doctorLogout", async (req:Request, res:Response)=> await profileController.doctorLogout(req, res))
