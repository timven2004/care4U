import express, { Request, Response } from 'express';
import {availableTimeSlotsController} from "../main"

export const availableTimeSlots = express.Router()


availableTimeSlots.get("/api/availableTimeSlots/", async (req:Request, res:Response)=>{

    availableTimeSlotsController.getAvailableTimeSlots(req,res)


})

