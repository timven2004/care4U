import Knex from "knex"
import { Response } from "express"


interface timeSlotsWithOutId {
    doctor_id: number,
    time_start: string,
    time_end: string
}

export class AvailableTimeSlotsService {
    private knex: Knex
    constructor(knex: Knex) {
        this.knex = knex
    }

    async newAvailavleTimeSlots(breakedTimeSlots: timeSlotsWithOutId[], doctorId: number) {
        const result = await this.knex.transaction(async (trx) => {
            try {
                //check if there is repeated time_start
                const existingFreeTime = await trx("doctors_available_time_slots").select("time_start", "doctor_id").where("doctor_id", doctorId)
                let toBeInputed: timeSlotsWithOutId[] = []
                for (let obj of breakedTimeSlots) {
                    let repeated = false;
                    for (let freeTime of existingFreeTime) {
                        let tempFreeTime = new Date(freeTime.time_start)
                        if (obj.time_start == tempFreeTime.toISOString()) {
                            repeated = true
                        }
                    }
                    if (!repeated) { toBeInputed.push(obj) }
                }
                // insert into database
                return await trx("doctors_available_time_slots").insert(
                    toBeInputed
                ).returning("*");
            } catch (err) {
                console.error(err)
                return { message: "internal Server error" }
            }
        })

        return result
    }

    async retrieveAvailableTimeSlots(res: Response) {
        try {
            const currentTime = (new Date(Date.now())).toISOString()
            const result = await this.knex.select("doctors_available_time_slots.id", "doctor_id", "time_start", "time_end", "name as doctor_name")
                .from("doctors_available_time_slots")
                .innerJoin("doctors", "doctors.id", "doctors_available_time_slots.doctor_id")
                .orderBy("time_start")
                .where("time_start",">", currentTime)
            return result;
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ message: "internal server error" })
            return
        }
    }

    async retrieveAvailableTimeSlotsFollowUp(res: Response, doctorId: number) {
        try {
            const currentTime = (new Date(Date.now())).toISOString()
            const result = await this.knex.select("doctors_available_time_slots.id", "doctor_id", "time_start", "time_end", "name as doctor_name")
                .from("doctors_available_time_slots")
                .innerJoin("doctors", "doctors.id", "doctors_available_time_slots.doctor_id")
                .where("doctor_id", doctorId)
                .andWhere(function() {
                    this.where('time_start', '>', currentTime)
                  })
            return result;
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ message: "internal server error" })
            return
        }
    }

    async bookAvailableTimeSlots(res: Response, userId: number, timeSlotId: number) {
        try {
            const transactionRecordId:number = await this.knex.transaction(async (trx) => {
                const availableTimeSlots = await trx.select("doctors_available_time_slots.id", "doctor_id", "time_start")
                    .from("doctors_available_time_slots")
                    .where("doctors_available_time_slots.id", timeSlotId)
                console.dir("availableTimeSlots = " + availableTimeSlots)
                // res.json(availableTimeSlots)
                // availableTimeSlots
                //[
                //     {
                //     id: 25,
                //     doctor_id: 102,
                //     time_start: "2037-01-03T02:00:00.000Z"
                //     }
                //     ]

                const questionnaires = await trx.select("id", "user_id")
                    .from("questionnaires")
                    .where("user_id", userId)


                const bookingId =await trx("bookings").insert({
                    time: availableTimeSlots[0].time_start,
                    user_id: userId,
                    doctor_id: availableTimeSlots[0].doctor_id,
                    is_active: true,
                    questionnaire_id: questionnaires[questionnaires.length - 1].id || 0
                }).returning("id")

                console.log(bookingId)

                const currentTime = (new Date(Date.now())).toISOString()
                

                await trx("doctors_available_time_slots").where("doctors_available_time_slots.id", availableTimeSlots[0]["id"]).del();
                //create transaction record
                const transactionRecordId = await trx("transaction_records").insert({
                    consultation_fee:100000,
                    user_id: userId,
                    doctor_id: availableTimeSlots[0].doctor_id,
                    service_fee:2000,
                    booking_id:parseInt(bookingId[0]),
                    is_success:false,
                    payment_date: currentTime
                }).returning("id")
                return transactionRecordId[0];
                
            })

            return transactionRecordId
        }
        catch (err) {
            console.error(err)
            res.status(500).json({ message: "internal server error" })
            return
        }
    }

}