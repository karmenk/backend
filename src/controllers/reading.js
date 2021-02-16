import Debug from 'debug'
import ReadingService from '../services/reading'

// const debug = Debug('ReadingController:debug')
const error = Debug('ReadingController:error')

let reading = {
  async getByClientId (clientId, date) {
    if (!date || !(/\d{4}-[01]\d-[0-3]\d/.test(date))) {
      error(`Invalid or missing date: ${date}`)
      throw new Error('Date invalid or missing from request')
    }
    return await ReadingService.findByClientIdAndDate(clientId, date)
  },
  async save (records) {
    let data = []

    records.map(r => {
      const body = r.body ? JSON.parse(r.body) : JSON.parse(r.Body)
      data.push({
        clientId: body.clientId,
        time: body.time,
        reading: body.reading
      })
    })
    return await ReadingService.saveMany(data)
  }
}

export default reading
