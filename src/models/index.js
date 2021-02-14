import Sequelize from 'sequelize'
import * as pg from 'pg'
import dbConfig from '../db.config'
import Account from './account'
import Client from './client'
import User from './user'
import Reading from './reading'

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  dialectModule: pg,
  operatorsAliases: '0',
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    useUTC: true
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

export const clientModel = Client(sequelize, Sequelize)
export const readingModel = Reading(sequelize, Sequelize)
export const userModel = User(sequelize, Sequelize)
export const accountModel = Account(sequelize, Sequelize)

readingModel.belongsTo(clientModel)
userModel.belongsTo(clientModel)
accountModel.belongsTo(userModel)


export default db
