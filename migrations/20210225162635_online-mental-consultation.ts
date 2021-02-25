import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("Users", (table)=>{
        table.increments("id");
        table.string("name");
        table.string("email");
        table.integer("telephone");
        table.string("password");
        table.date("created_at")
        table.date("updated_at")
    })

    await knex.schema.createTable("Doctors", (table)=>{
        table.increments("id");
        table.string("name");
        table.string("email");
        table.integer("telephone");
        table.string("password");
        table.date("created_at")
        table.date("updated_at")
        table.text("description")

    })

    await knex.schema.createTable("Questionnaires", (table)=>{
        table.increments("id");
        table.integer("user_id");
        table.foreign("user_id").references("Users.id");
        table.integer("insomnia");
        table.integer("depressed");
        table.integer("panic");
        table.integer("other_symptoms")
    })

    await knex.schema.createTable("Bookings", (table)=>{
        table.increments("id");
        table.timestamp("time");
        table.integer("user_id");
        table.foreign("user_id").references("Users.id");
        table.integer("doctor_id");
        table.foreign("doctor_id").references("Doctors.id");
        table.integer("questionnaire_id");
        table.foreign("questionnaire_id").references("Questionnaires.id");
        table.boolean("is_active");
    }) 

    await knex.schema.createTable("Doctors_available_time_slots", (table)=>{
        table.increments("id");
        table.integer("doctor_id");
        table.foreign("doctor_id").references("Doctors.id");
        table.timestamp("time_start");
        table.timestamp("time_end")
    }) 

    await knex.schema.createTable("Transaction_records", (table)=>{
        table.increments("id");
        table.integer("consultation_fee");
        table.integer("service_fee");
        table.integer("user_id");
        table.foreign("user_id").references("Users.id")
        table.integer("doctor_id")
        table.foreign("doctor_id").references("Doctors.id")
        table.integer("booking_id")
        table.foreign("booking_id").references("Bookings.id")
        table.boolean("is_success")
        table.timestamp("payment_date")

        await knex.schema.createTable("Medical_records", (table)=>{
            table.increments("id");
            table.text("doctor_comment");
            table.integer("user_id");
            table.foreign("user_id").references("Users.id")
            table.integer("doctor_id")
            table.foreign("doctor_id").references("Doctors.id")
            table.integer("booking_id")
            table.foreign("booking_id").references("Bookings.id")
            table.integer("transaction_id")
            table.foreign("transaction_id").references("Transaction_records.id")
    


    }) 
}}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("Medical_records");
    await knex.schema.dropTable("Transaction_records");
    await knex.schema.dropTable("Doctors_available_time_slots");
    await knex.schema.dropTable("Bookings");
    await knex.schema.dropTable("Questionnaires");
    await knex.schema.dropTable("Doctors");
    await knex.schema.dropTable("Users");

}

