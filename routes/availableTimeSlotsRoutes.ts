import express, { Request, Response } from 'express';
import {availableTimeSlotsController} from "../main"

export const availableTimeSlots = express.Router()


availableTimeSlots.get("/api/availableTimeSlots/", async (req:Request, res:Response)=>{

    availableTimeSlotsController.getAvailableTimeSlots(req,res);})

    
availableTimeSlots.get("/api/availableTimeSlotsFollowUp/:doctorId", async (req:Request, res:Response)=>{
    let doctorIdstr = req.params.doctorId;
    let doctorId = parseInt(doctorIdstr)
    availableTimeSlotsController.getAvailableTimeSlotsFollowUp(req,res,doctorId);
})

availableTimeSlots.post("/api/book/", async (req:Request, res:Response)=>{
    availableTimeSlotsController.bookAvailableTimeSlots(req,res);
})

availableTimeSlots.post("/api/availableTimeSlots", async (req:Request, res:Response)=>{
    console.log(req.body)

    // availableTimeSlotsController.postAvailableTimeSlots(req,res);
})