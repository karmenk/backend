import AWS from 'aws-sdk'
import Debug from 'debug'
import { v4 as uuidv4 } from 'uuid'
import ClientService from './client'

// const debug = Debug('ReadingsGeneratorService:debug')
const error = Debug('ReadingsGeneratorService:error')

const sqs = new AWS.SQS({
  region: "us-east-1",
})
const queueUrl = process.env.QUEUE_URL

let readingsGenerator = {
  async sendToQueue () {
    const data = await this.generate()
    if (!data.length) {
      return
    }

    return await sqs.sendMessageBatch(this.createBatch(data)).promise()
  },
  async generate () {
    let rows
    try {
      rows = await ClientService.getAllActive()
    } catch (e) {
      error(e)
      return []
    }
    if (!rows) {
      return []
    }
    const now = Date.now()
    return rows.map(row => {
      return {
        id: row.id,
        time: now,
        reading: Math.floor(Math.random() * (65 - 5 + 1) + 5)
      }
    })
  },
  createBatch (data) {
    let batch = {
      QueueUrl: queueUrl,
      Entries: []
    }

    data.map(item => {
      batch.Entries.push({
        Id: uuidv4(),
        MessageBody: JSON.stringify({'clientId': item.id, 'time': item.time, 'reading': item.reading})
      })
    })
    return batch
  }
}

export default readingsGenerator
