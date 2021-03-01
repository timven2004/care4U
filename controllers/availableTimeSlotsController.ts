import { Request, Response } from "express"
import { AvailableTimeSlotsService } from "../services/availableTimeSlotsService"

export class AvailableTimeSlotsController {
    private availableTimeSlotsServices:AvailableTimeSlotsService

    constructor(availableTimeSlotsServices: AvailableTimeSlotsService) {
        this.availableTimeSlotsServices = availableTimeSlotsServices
    }

    async getAvailableTimeSlots(req:Request, res:Response){
        res.json(await this.availableTimeSlotsServices.retrieveAvailableTimeSlots(res));
        
    }

    async getAvailableTimeSlotsFollowUp(req:Request, res:Response, doctorId:number){
        res.json(await this.availableTimeSlotsServices.retrieveAvailableTimeSlotsFollowUp(res, doctorId));
        
    }

    async bookAvailableTimeSlots(req:Request, res:Response){
        const id = req.body.timeSlotsId;
        const timeSlotId = req.body.timeSlotsId
                                //userId = 39 is for temporary use

        const userId = req.session["userId"] || 39;

        console.log("timeSlotsId= " + id);
        res.json(await this.availableTimeSlotsServices.bookAvailableTimeSlots(res, userId, timeSlotId));
        
    }

}
