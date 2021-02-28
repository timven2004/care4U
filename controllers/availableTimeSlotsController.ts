import { Request, Response } from "express"
import { AvailableTimeSlotsService } from "../services/availableTimeSlotsService"

export class AvailableTimeSlotsController {
    private availableTimeSlotsServices:AvailableTimeSlotsService

    constructor(availableTimeSlotsServices: AvailableTimeSlotsService) {
        this.availableTimeSlotsServices = availableTimeSlotsServices
    }

    async getAvailableTimeSlots(req:Request, res:Response){
        await this.availableTimeSlotsServices.retrieveAvailableTimeSlots(req, res);
    }

}
