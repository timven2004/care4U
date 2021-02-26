import Knex from 'knex'
import {Request} from "express"

export class ProfileService {
    private knex:Knex
    constructor (knex:Knex){
        this.knex = knex
    }

    async getUserProfile(id:number, withPassword:boolean = false){
        const result = await this.knex.select("name","email","telephone","password","created_at","updated_at").from("users").where("id",id)
        if (withPassword){
            return result[0]}
        else {
            result[0].password = "hidden from server";
            return result
        }
        
    }

    async updateUserProfile(id:number, body:Request['body']){
        await this.knex("users")
                    .where("id",id)
                    .update({"name":body["name"],
                    "email":body["email"],
                    "telephone":body["telephone"],
                    "password":body["password"],
                    "updated_at":this.knex.fn.now()})
    }

    async getDoctorProfile(id:number, withPassword:boolean = false){
        const result = await this.knex.select("name","email","telephone","password","created_at","updated_at","description").from("doctors").where("id",id)
        if (withPassword){
            return result[0]}
        else {
            result[0].password = "hidden from server";
            return result
        }
        

    }

    async updateDoctorProfile(id:number, body:Request['body']){
        await this.knex("users")
                    .where("id",id)
                    .update({"name":body["name"],
                    "email":body["email"],
                    "telephone":body["telephone"],
                    "password":body["password"],
                    "description":body["description"],
                    "updated_at":this.knex.fn.now()})
    }

    
}