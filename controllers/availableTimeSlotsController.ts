import { Request, Response } from "express"
import { AvailableTimeSlotsService } from "../services/availableTimeSlotsService"

interface timeObj {
    time_start: string,
    time_end: string
}

interface timeSlotsWithOutId {
    doctor_id: number,
    time_start: string,
    time_end: string
}

export class AvailableTimeSlotsController {
    private availableTimeSlotsServices: AvailableTimeSlotsService

    constructor(availableTimeSlotsServices: AvailableTimeSlotsService) {
        this.availableTimeSlotsServices = availableTimeSlotsServices
    }

    async getAvailableTimeSlots(req: Request, res: Response) {
        res.json(await this.availableTimeSlotsServices.retrieveAvailableTimeSlots(res));

    }

    async getAvailableTimeSlotsFollowUp(req: Request, res: Response, doctorId: number) {
        res.json(await this.availableTimeSlotsServices.retrieveAvailableTimeSlotsFollowUp(res, doctorId));

    }

    async bookAvailableTimeSlots(req: Request, res: Response) {
        const id = req.body.timeSlotsId;
        const timeSlotId = req.body.timeSlotsId
        //userId = 39 is for temporary use

        const userId = req.session["userId"];

        console.log("timeSlotsId= " + id);
        const transactionRecordId= await this.availableTimeSlotsServices.bookAvailableTimeSlots(res, userId, timeSlotId);
        req.session["transactionRecordId"] = transactionRecordId;
        res.redirect("/user/paymentPreview.html")
    }

    async postAvailableTimeSlots(req: Request, res: Response) {
        try {
            const timeSlots = req.body
            console.log(timeSlots)
            let timeObjs: timeObj[] = []

            for (let i = 0; i < timeSlots.timeStart.length - 1; i++) {
                if ((timeSlots.timeStart[i] && timeSlots.timeEnd[i])
                    && ((Date.parse(timeSlots.timeEnd[i]) - Date.parse(timeSlots.timeStart[i])) > 0))
                 {

                    timeObjs.push( {
                        time_start: timeSlots.timeStart[i],
                        time_end: timeSlots.timeEnd[i]
                    })

                }             
            }
            console.log(timeObjs);
            let breakedTimeSlots: timeSlotsWithOutId[] = []
            for (let timeObj of timeObjs) {
                let hours = (Date.parse(timeObj.time_end) - (Date.parse(timeObj.time_start))) / 3600000
                console.log (Date.parse(timeObj.time_end));
                console.log(Date.parse(timeObj.time_start));
                console.log(hours);
                let tempStart = Date.parse(timeObj.time_start);
                for (let i = 0; i < hours; i++) {
                    let tempEnd = tempStart + 3600000;
                    let tempStartInstance = new Date(tempStart);
                    let tempEndInstance = new Date(tempEnd)
                    breakedTimeSlots.push({

                        //122 is for Temporary Use
                        doctor_id: req.session["doctorId"] || 122,
                        time_start: tempStartInstance.toISOString(),
                        time_end: tempEndInstance.toISOString()
                    })
                    tempStart = tempStart + 3600000;
                    console.log(tempStart)
                }
            }
            console.log(breakedTimeSlots);
            //122 is for Temporary Use
            await this.availableTimeSlotsServices.newAvailavleTimeSlots(breakedTimeSlots, req.session["doctorId"] || 122)
            res.redirect(`/doctor/doctorProfile.html?doctorId=${req.session["doctorId"]}`)
        } catch (err) {
            console.error(err)
            res.status(502).json({ message: "internal server error" })
        }
    }

}
