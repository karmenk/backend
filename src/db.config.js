import * as pg from 'pg'

const config = {
  "development": {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    options: {
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      dialect: "postgres",
      dialectModule: pg,
      operatorsAliases: '0',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 60000
      }
    }
  },
  "production": {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    options: {
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      dialect: "postgres",
      dialectModule: pg,
      operatorsAliases: '0',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 60000
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
        useUTC: true
      }
    }
  },
  "test": {
    username: process.env.PG_TEST_USERNAME,
    password: process.env.PG_TEST_PASSWORD,
    database: process.env.PG_TEST_DATABASE,
    options: {
      host: process.env.PG_TEST_HOST,
      port: process.env.PG_TEST_PORT,
      dialect: "postgres",
      dialectModule: pg,
      operatorsAliases: '0',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 60000
      }
    }
  }
}

export default config
