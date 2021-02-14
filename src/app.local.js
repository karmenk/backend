import {} from 'dotenv/config'
import app from './app.js'
import db from './models/index'
import Debug from 'debug'

// const debug = Debug('ServerLocal:debug')
const info = Debug('ServerLocal:info')
const error = Debug('ServerLocal:error')

const port = 3030

;(async () => {
  try {
    await db.sequelize.sync()
  } catch (e) {
    error(e)
  }
})()

app.listen(port)

info(`listening on http://localhost:${port}`)
