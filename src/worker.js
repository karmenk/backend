import {} from 'dotenv/config'
import Debug from 'debug'
import * as AWS from 'aws-sdk'
import { Consumer } from 'sqs-consumer'
import Reading from './controllers/reading'
import db from './models'

// const info = Debug('worker:info')
const error = Debug('worker:error')

;(async () => {
  try {
    await db.sequelize.sync()
  } catch (e) {
    error(e)
  }
})()

const consumer = (callback) => {
  return Consumer.create({
    queueUrl: process.env.QUEUE_URL,
    handleMessageBatch: callback,
    batchSize: 10,
    sqs: new AWS.SQS({ region: "us-east-1" })
  })
}

consumer(async (records) => {
  await Reading.save(records)
}).start()
