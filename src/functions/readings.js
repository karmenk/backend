import handler from 'serverless-express/handler'
import app from '../app'
import db from '../models/index'
import Debug from 'debug'

// const debug = Debug('ReadingsFunction:debug')
// const info = Debug('ReadingsFunction:info')
const error = Debug('ReadingsFunction:error')

;(async () => {
  try {
    await db.sequelize.sync()
  } catch (e) {
    error(e)
  }
})()

export default handler(app)
