import AWS from 'aws-sdk'
import { clientModel } from '../models/index'
import Debug from 'debug'
import { v4 as uuidv4 } from 'uuid'

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

    let params = {
      QueueUrl: queueUrl,
      Entries: []
    }

    data.map(item => {
      params.Entries.push({
        Id: uuidv4(),
        MessageBody: JSON.stringify({'clientId': item.id, 'time': item.time, 'reading': item.reading})
      })
    })
    return await sqs.sendMessageBatch(params).promise()
  },
  async generate () {
    const now = Date.now()
    let rows
    try {
      rows = await clientModel.findAll({where: {active: true}})
    } catch (e) {
      error(e)
      return []
    }
    if (!rows) {
      return []
    }
    return rows.map(row => {
      return {
        id: row.id,
        time: now,
        reading: Math.floor(Math.random() * (65 - 5 + 1) + 5)
      }
    })
  }
}

export default readingsGenerator
