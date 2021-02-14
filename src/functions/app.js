import handler from 'serverless-express/handler'
import app from '../app'
import db from '../models/index'
import Debug from 'debug'

// const debug = Debug('AppFunction:debug')
const error = Debug('AppFunction:error')

;(async () => {
  try {
    await db.sequelize.sync()
  } catch (e) {
    error(e)
  }
})()

export default handler(app)
