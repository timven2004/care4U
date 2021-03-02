// Update with your config settings.

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
      database: process.env.STAGING_DB_NAME,
      user: process.env.STAGING_USERNAME,
      password: process.env.STAGING_PASSWORD
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
      database: process.env.PRODUCTION_DB_NAME,
      user: process.env.PRODUCTION_USERNAME,
      password: process.env.PRODUCTION_PASSWORD
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
