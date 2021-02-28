import Knex from "knex"
import {Request, Response }from "express"

export class AvailableTimeSlotsService {
    private knex: Knex
    constructor(knex: Knex) {
        this.knex = knex
    }

    async retrieveAvailableTimeSlots(req:Request, res:Response) {
        try {
            const result = await this.knex.select("doctors_available_time_slots.id", "doctor_id", "time_start", "time_end","name as doctor_name")
            .from("doctors_available_time_slots")
            .innerJoin("doctors","doctors.id","doctors_available_time_slots.doctor_id");
            res.json(result);
        } catch (err) { console.error(err.message) 
             res.status(500).json({message:"internal server error"})
             return
        }
    }

}