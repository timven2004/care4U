import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
await knex.schema.dropTable("medical_records")

}


export async function down(knex: Knex): Promise<void> {
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

