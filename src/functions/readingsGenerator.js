import ReadingsGenerator from '../services/readingsGenerator'
import db from '../models'
import Debug from 'debug'

// const debug = Debug('ReadingsGeneratorFunction:debug')
const error = Debug('ReadingsGeneratorFunction:error')

;(async () => {
  try {
    await db.sequelize.sync()
  } catch (e) {
    error(e)
  }
})()

export default async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  let responseCode = 200

  try {
    const result = await ReadingsGenerator.sendToQueue()
    if (result.Failed.length) {
      responseCode = 500
    }
  } catch (e) {
    error(e)
    responseCode = 500
  }

  const response = {
    statusCode: responseCode,
    headers: {
      "Content-Type": "application/json",
    }
  }

  callback(null, response)
}
