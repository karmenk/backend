import AWS from 'aws-sdk'
import { clientModel } from '../models/index'
import Debug from 'debug'
import { v4 as uuidv4 } from 'uuid'

const debug = Debug('ReadingsGeneratorService:debug')
// const info = Debug('ReadingsGeneratorService:info')
// const error = Debug('ReadingsGeneratorService:error')

const sqs = new AWS.SQS({
  region: "us-east-1",
})
const queueUrl = process.env.QUEUE_URL

let readingsGenerator = {
  async sendToQueue () {
    const data = await this.generate()

    let params = {
      QueueUrl: queueUrl,
      Entries: []
    }

    data.map(item => {
      debug(item)
      params.Entries.push({
        Id: uuidv4(),
        MessageBody: JSON.stringify({'clientId': item.id, 'time': item.time, 'reading': item.reading})
      })
    })

    debug(params)

    return await sqs.sendMessageBatch(params).promise()
  },
  async generate () {
    const now = Date.now()
    const rows = await clientModel.findAll({where: {active: true}})
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
