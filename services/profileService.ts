import Knex from "knex";
import { Request } from "express";
import { hashPassword } from "../hash";
import { User, Doctor } from "./model";

export class ProfileService {
    private knex: Knex;
    constructor(knex: Knex) {
        this.knex = knex;
    }

    async getUserByEmail(email: any, withPassword: boolean = false) {
        const user = await this.knex
            .select<User>("email", "password", "id")
            .from("users")
            .where("email", email)
            .first();
        return user;
    }

    async createUser(body: Request["body"]) {
        const hashPassword1 = await hashPassword(body.password);
        const result = await this.knex.transaction(async (trx) => {
            return trx.insert({
                name: body["name"],
                email: body["email"],
                telephone: body["telephone"],
                password: hashPassword1,
                created_at: trx.fn.now(),
                updated_at: trx.fn.now(),
            }).into("users").returning('id');
        });
        return result;
    }

    async getUserProfile(id: number, withPassword: boolean = false) {
        const result = await this.knex
            .select(
                "name",
                "email",
                "telephone",
                "password",
                "created_at",
                "updated_at"
            )
            .from("users")
            .where("id", id);

        if (result[0]) {
            if (withPassword) {
                return result[0];
            } else {
                result[0].password = "hidden from server";
                return result;
            }
        }

        throw "User Not Found from profileServices";
    }

    async getUserBookingHistory(id: number) {
        const result = await this.knex
            .select(
                "time",
                "doctor_id",
                "is_active",
                "questionnaire_id",
                "doctors.name",
                "doctors.telephone"
            )
            .from("bookings")
            .innerJoin("doctors", "doctor_id", "doctors.id")
            .where("bookings.user_id", id);
        return result;
    }

    async updateUserProfile(id: number, body: Request["body"]) {
        const result = await this.knex.transaction(async (trx) => {
            return trx("users")
                .where("id", id)
                .update({
                    name: body["name"],
                    email: body["email"],
                    telephone: body["telephone"],
                    password: hashPassword(body["password"]),
                    updated_at: this.knex.fn.now(),
                })
                .returning(["name", "email", "telephone", "updated_at"]);
        });
        return result;
        //     console.log(body)
        //    const result= await this.knex("users")
        //                 .where("id",id)
        //                 .update({"name":body["name"],
        //                 "email":body["email"],
        //                 "telephone":body["telephone"],
        //                 "password":body["password"],
        //                 "updated_at":this.knex.fn.now()})
        //                 .returning(["name","email","telephone","updated_at"]);

        //                 return result
    }

    async createDoctor(body: Request["body"]) {
        const hashPassword1 = await hashPassword(body.password);
        const result = await this.knex.transaction(async (trx) => {
            return trx.insert({
                name: body["name"],
                email: body["email"],
                telephone: body["telephone"],
                password: hashPassword1,
                description: body["description"],
                created_at: trx.fn.now(),
                updated_at: trx.fn.now(),
            }).into("doctors").returning('id');
        });
        return result;
    }

    async getDoctorProfile(doctorId: number, withPassword: boolean = false) {
        const result = await this.knex
            .select(
                "name",
                "email",
                "telephone",
                "password",
                "created_at",
                "updated_at",
                "description"
            )
            .from("doctors")
            .where("id", doctorId);
        if (withPassword) {
            return result[0];
        } else {
            result[0].password = "hidden from server";
            return result;
        }
    }

    async getDoctorBookingHistory(doctorId: number) {
        const result = await this.knex
            .select(
                "questionnaires.insomnia",
                "questionnaires.depressed",
                "questionnaires.panic",
                "questionnaires.other_symptoms",
                "bookings.time",
                "bookings.user_id",
                "bookings.is_active",
                "bookings.questionnaire_id",
                "users.name",
                "users.email as clientEmail",
                "users.telephone",
                "bookings.questionnaire_id"
            )
            .from("bookings")
            .innerJoin("users", "bookings.user_id", "users.id")
            .innerJoin(
                "questionnaires",
                "questionnaires.id",
                "bookings.questionnaire_id"
            )
            .where("bookings.doctor_id", doctorId);

        return result;
    }

    async updateDoctorProfile(doctorId: number, body: Request["body"]) {
        const result = await this.knex.transaction(async (trx) => {
            return trx("doctors")
                .where("id", doctorId)
                .update({
                    name: body["name"],
                    email: body["email"],
                    telephone: body["telephone"],
                    password: body["password"],
                    updated_at: this.knex.fn.now(),
                    description: body["description"],
                })
                .returning(["name", "email", "telephone", "updated_at"]);
        });
        return result;

        // await this.knex("users")
        //             .where("id",id)
        //             .update({"name":body["name"],
        //             "email":body["email"],
        //             "telephone":body["telephone"],
        //             "password":body["password"],
        //             "description":body["description"],
        //             "updated_at":this.knex.fn.now()})
    }

    async getDoctorByEmail(email: any, withPassword: boolean = false) {
        const doctor = await this.knex
            .select<Doctor>("email", "password", "id")
            .from("doctors")
            .where("email", email)
            .first();
        return doctor;
    }
}


