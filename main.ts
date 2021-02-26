import express from "express"
import Knex from 'knex';
import {ProfileService} from "./services/profileService"
import {ProfileController} from "./controllers/profileController"
import dotenv from "dotenv"
import {routes} from "./routes/route"

dotenv.config();
const app = express()
const knexConfig = require("./knexfile")
const knex = Knex(knexConfig[process.env.NODE_ENV])
export const profileService = new ProfileService(knex)
export const profileController = new ProfileController(profileService)


app.use(express.static('public'));

app.use("/",routes)

app.use((req,res)=>{
    res.status(404).json({message:"404 Not found"})
})

app.listen(8080, ()=>{
    console.log("server started! listening on port 8080")
})