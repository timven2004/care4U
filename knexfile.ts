// Update with your config settings.

import dotenv from "dotenv";
dotenv.config();

module.exports = {

  development: {
    client: "postgresql",
    connection: {
      database: process.env.DEVELOPMENT_DB_NAME,
      user: process.env.DEVELOPMENT_USERNAME,
      password: process.env.DEVELOPMENT_PASSWORD,
      host:'localhost'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },


  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};
