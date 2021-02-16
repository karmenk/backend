import Sequelize from 'sequelize'
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

const sequelize = new Sequelize(config.database, config.username, config.password, config.options)

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
