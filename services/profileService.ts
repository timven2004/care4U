import Knex from 'knex'
import { Request } from "express"


export class ProfileService {
    private knex: Knex
    constructor(knex: Knex) {
        this.knex = knex
    }


    async createUser(body: Request['body']){
        const result = await this.knex.transaction( async (trx)=>{
            return trx("users").insert({
                "name": body["name"],
                "email": body["email"],
                "telephone": body["telephone"],
                "password": body["password"],
                "created_at": trx.fn.now(),
                "updated_at": trx.fn.now()
            })
        })
        return result
    }

    async getUserProfile(id: number, withPassword: boolean = false) {
        const result = await this.knex.select("name", "email", "telephone", "password", "created_at", "updated_at").from("users").where("id", id)

        if (result[0]) {
            if (withPassword) {
                return result[0]
            }
            else {
                result[0].password = "hidden from server";
                return result
            }
        }

        throw "User Not Found from profileServices";
    }

async updateUserProfile(id: number, body: Request['body']){

    const result = await this.knex.transaction(async (trx) => {
      return trx("users")
            .where("id", id)
            .update({
                "name": body["name"],
                "email": body["email"],
                "telephone": body["telephone"],
                "password": body["password"],
                "updated_at": this.knex.fn.now()
            })
         .returning(["name","email","telephone","updated_at"]);
    })
    return result
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

async createDoctor(body: Request['body']){
    const result = await this.knex.transaction( async (trx)=>{
        return trx("doctors").insert({
            "name": body["name"],
            "email": body["email"],
            "telephone": body["telephone"],
            "password": body["password"],
            "created_at": trx.fn.now(),
            "updated_at": trx.fn.now()
        })
    })
    return result
}

async getDoctorProfile(id: number, withPassword: boolean = false){
    const result = await this.knex.select("name", "email", "telephone", "password", "created_at", "updated_at", "description").from("doctors").where("id", id)
    if (withPassword) {
        return result[0]
    }
    else {
        result[0].password = "hidden from server";
        return result
    }


}

async updateDoctorProfile(id: number, body: Request['body']){

    const result = await this.knex.transaction(async (trx) => {
        return trx("doctors")
              .where("id", id)
              .update({
                  "name": body["name"],
                  "email": body["email"],
                  "telephone": body["telephone"],
                  "password": body["password"],
                  "updated_at": this.knex.fn.now()
              })
           .returning(["name","email","telephone","updated_at"]);
      })
      return result

    // await this.knex("users")
    //             .where("id",id)
    //             .update({"name":body["name"],
    //             "email":body["email"],
    //             "telephone":body["telephone"],
    //             "password":body["password"],
    //             "description":body["description"],
    //             "updated_at":this.knex.fn.now()})
}

    
}