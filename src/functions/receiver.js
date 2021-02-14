import Reading from '../controllers/reading'
import db from '../models/index'
import Debug from 'debug'

const debug = Debug('ReceiverFunction:debug')
const error = Debug('ReceiverFunction:error')

;(async () => {
  try {
    await db.sequelize.sync()
  } catch (e) {
    error(e)
  }
})()

const handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "SQS event processed.",
      input: event,
    }),
  }
  debug(event.Records)
  await Reading.save(event.Records)
  callback(null, response)
}

export default handler
