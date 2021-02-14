const config = {
  HOST: process.env.PG_HOST,
  PORT: process.env.PG_PORT,
  USER: process.env.PG_USERNAME,
  PASSWORD: process.env.PG_PASSWORD,
  DB: process.env.PG_DATABASE,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 60000
  }
}

export default config
