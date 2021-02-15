import Sequelize from 'sequelize'
import * as pg from 'pg'
import dbConfig from '../db.config'
import Account from './account'
import Client from './client'
import User from './user'
import Reading from './reading'

let config
if (process.env.NODE_ENV) {
  config = dbConfig[process.env.NODE_ENV]
} else {
  config = dbConfig.development
}

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  port: config.PORT,
  dialect: config.dialect,
  dialectModule: pg,
  operatorsAliases: '0',
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
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
