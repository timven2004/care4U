import { questionnaireRoutes } from "./routes/questionnaireRoute";
import express from "express";
import Knex from "knex";
import { ProfileService } from "./services/profileService";
import { ProfileController } from "./controllers/profileController";
import dotenv from "dotenv";
import { profileRoutes } from "./routes/profileRoute";
import bodyParser from "body-parser";
import { PaymentController } from "./controllers/paymentController";
import { PaymentServices } from "./services/paymentServices";
import { paymentRoutes } from "./routes/paymentRoutes";
import expressSession from "express-session";
import { QuestionnaireService } from "./services/questionnaireServices";
import { QuestionnaireController } from "./controllers/questionnaireController";
import { AvailableTimeSlotsService } from "./services/availableTimeSlotsService";
import { AvailableTimeSlotsController } from "./controllers/availableTimeSlotsController";
import { availableTimeSlots } from "./routes/availableTimeSlotsRoutes";
import { isLoggedInUSERHTML } from "./guard";
import path from "path";

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Add this line

const app = express();

app.use(
    expressSession({
        secret: "c13-bad-Group6",
        resave: true,
        saveUninitialized: true,
    })
);

const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

export const profileService = new ProfileService(knex);
export const profileController = new ProfileController(profileService);
export const paymentServices = new PaymentServices(
    process.env.YOUR_DOMAIN || "http://localhost:8080",
    stripe,
    knex
);
export const paymentController = new PaymentController(paymentServices);
export const availableTimeSlotsService = new AvailableTimeSlotsService(knex);
export const availableTimeSlotsController = new AvailableTimeSlotsController(
    availableTimeSlotsService
);
export const questionnaireService = new QuestionnaireService(knex);
export const questionnaireController = new QuestionnaireController(
    questionnaireService
);

app.use(profileRoutes);
app.use(paymentRoutes);
app.use(availableTimeSlots);
app.use(questionnaireRoutes);

app.use(express.static(path.join(__dirname, "public")));
app.use(isLoggedInUSERHTML, express.static(path.join(__dirname, "private")));
// app.use((req, res) => {
//     res.sendFile(path.join(__dirname, "404.html"));
// });


app.use((req, res) => {
    res.status(404).json({ message: "404 Not found" });
});

app.listen(8080, () => {
    console.log("server started! listening on port 8080");
});
