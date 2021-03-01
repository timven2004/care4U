import Knex from "knex"
import { Response } from "express"


interface timeSlots{
    id:number,
    doctor_id:number,
    time_start: string,
    time_end: string
    }

export class AvailableTimeSlotsService {
    private knex: Knex
    constructor(knex: Knex) {
        this.knex = knex
    }

    async newAvailavleTimeSlots(timeSlots:timeSlots[]){
        const result = await this.knex("doctors_available_time_slots").insert({
            timeSlots
        })

        return result
    }

    async retrieveAvailableTimeSlots(res:Response) {
        try {
            const result = await this.knex.select("doctors_available_time_slots.id", "doctor_id", "time_start", "time_end", "name as doctor_name")
                .from("doctors_available_time_slots")
                .innerJoin("doctors", "doctors.id", "doctors_available_time_slots.doctor_id");
            return result;
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ message: "internal server error" })
            return
        }
    }

    async retrieveAvailableTimeSlotsFollowUp(res:Response, doctorId:number) {
        try {
            const result = await this.knex.select("doctors_available_time_slots.id", "doctor_id", "time_start", "time_end", "name as doctor_name")
                .from("doctors_available_time_slots")
                .innerJoin("doctors", "doctors.id", "doctors_available_time_slots.doctor_id")
                .where("doctor_id", doctorId);
            return result;
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ message: "internal server error" })
            return
        }
    }

    async bookAvailableTimeSlots(res:Response ,userId:number, timeSlotId:number ) {
        try {
            const result = await this.knex.transaction( async (trx) => {
                const availableTimeSlots = await trx.select("doctors_available_time_slots.id", "doctor_id", "time_start")
                .from("doctors_available_time_slots")
                .where("doctors_available_time_slots.id", timeSlotId)
                console.dir("availableTimeSlots = "+  availableTimeSlots)
                // res.json(availableTimeSlots)
                // availableTimeSlots
                //[
                //     {
                //     id: 25,
                //     doctor_id: 102,
                //     time_start: "2037-01-03T02:00:00.000Z"
                //     }
                //     ]

                const questionnaires = await trx.select("id","user_id")
                .from("questionnaires")
                .where("user_id", userId)


                await trx("bookings").insert({
                    time:availableTimeSlots[0].time_start,
                    user_id:userId,
                    doctor_id:availableTimeSlots[0].doctor_id,
                    is_active: true,
                    questionnaire_id: questionnaires[questionnaires.length-1].id||0
                })


                await trx("doctors_available_time_slots").where("doctors_available_time_slots.id", availableTimeSlots[0]["id"]).del();
            })
        
            return result
        }
     catch(err) {
        console.error(err)
        res.status(500).json({ message: "internal server error" })
        return
    }
}

}