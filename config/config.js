// import {} from 'dotenv/config'
require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE,
    "host": process.env.PG_HOST,
    "port": process.env.PG_PORT,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE,
    "host": process.env.PG_HOST,
    "port": process.env.PG_PORT,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  },
  "test": {
    "username": process.env.PG_TEST_USERNAME,
    "password": process.env.PG_TEST_PASSWORD,
    "database": process.env.PG_TEST_DATABASE,
    "host": process.env.PG_TEST_HOST,
    "port": process.env.PG_TEST_PORT,
    "dialect": "postgres"
  }
}
