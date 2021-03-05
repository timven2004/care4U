import express, { Request, Response } from 'express';
import {availableTimeSlotsController} from "../main"

export const availableTimeSlots = express.Router()


availableTimeSlots.get("/api/availableTimeSlots/", async (req:Request, res:Response)=>{

    availableTimeSlotsController.getAvailableTimeSlots(req,res);})

    
availableTimeSlots.get("/api/availableTimeSlotsFollowUp/", async (req:Request, res:Response)=>{

    availableTimeSlotsController.getAvailableTimeSlotsFollowUp(req,res);
})

availableTimeSlots.post("/api/book/", async (req:Request, res:Response)=>{
    availableTimeSlotsController.bookAvailableTimeSlots(req,res);
})

availableTimeSlots.post("/api/availableTimeSlots", async (req:Request, res:Response)=>{
    availableTimeSlotsController.postAvailableTimeSlots(req,res)

    // availableTimeSlotsController.postAvailableTimeSlots(req,res);
})