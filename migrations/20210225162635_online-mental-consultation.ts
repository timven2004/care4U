import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.integer("telephone").notNullable();
        table.string("password").notNullable();
        table.date("created_at");
        table.date("updated_at");
    })

    await knex.schema.createTable("doctors", (table) => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.integer("telephone").notNullable();
        table.string("password").notNullable();
        table.date("created_at")
        table.date("updated_at")
        table.text("description")

    })

    await knex.schema.createTable("questionnaires", (table) => {
        table.increments("id");
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("users.id");
        table.integer("insomnia").notNullable();
        table.integer("depressed").notNullable();
        table.integer("panic").notNullable();
        table.integer("other_symptoms").notNullable()
    })

    await knex.schema.createTable("bookings", (table) => {
        table.increments("id");
        table.timestamp("time").notNullable();
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("users.id");
        table.integer("doctor_id").unsigned().notNullable();
        table.foreign("doctor_id").references("doctors.id");
        table.integer("questionnaire_id").unsigned().notNullable();
        table.foreign("questionnaire_id").references("questionnaires.id");
        table.boolean("is_active").notNullable();
    })

    await knex.schema.createTable("doctors_available_time_slots", (table) => {
        table.increments("id");
        table.integer("doctor_id").unsigned().notNullable();
        table.foreign("doctor_id").references("doctors.id");
        table.timestamp("time_start").notNullable();
        table.timestamp("time_end").notNullable()
    })

    await knex.schema.createTable("transaction_records", (table) => {
        table.increments("id");
        table.integer("consultation_fee").unsigned().notNullable();
        table.integer("service_fee").unsigned().notNullable();
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("users.id")
        table.integer("doctor_id").notNullable()
        table.foreign("doctor_id").references("doctors.id")
        table.integer("booking_id").notNullable()
        table.foreign("booking_id").references("bookings.id")
        table.boolean("is_success").notNullable()
        table.timestamp("payment_date").notNullable()
    })

    await knex.schema.createTable("medical_records", (table) => {
        table.increments("id");
        table.text("doctor_comment").notNullable();
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("users.id")
        table.integer("doctor_id").unsigned().notNullable()
        table.foreign("doctor_id").references("doctors.id")
        table.integer("booking_id").unsigned().notNullable()
        table.foreign("booking_id").references("bookings.id")
        table.integer("transaction_id").unsigned().notNullable()
        table.foreign("transaction_id").references("transaction_records.id")



    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("medical_records");
    await knex.schema.dropTable("transaction_records");
    await knex.schema.dropTable("doctors_available_time_slots");
    await knex.schema.dropTable("bookings");
    await knex.schema.dropTable("questionnaires");
    await knex.schema.dropTable("doctors");
    await knex.schema.dropTable("users");

}

