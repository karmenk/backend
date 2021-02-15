import Debug from 'debug'
import dayjs from 'dayjs'
import db, { readingModel } from '../models'

// const debug = Debug('ReadingService:debug')
const error = Debug('ReadingService:error')

let reading = {
  async getAll () {
    try {
      return await readingModel.findAll({})
    } catch (e) {
      error(e)
      throw new Error('Unable to get readings')
    }
  },
  async findByClientIdAndDate (clientId, date) {
    let where = {clientId: clientId}
    const today = dayjs(date).add(1, 'hour')  // reading for first hour (00:00 - 01:00) is at 1am
    const tomorrow = today.add(1, 'day').format('YYYY-MM-DD hh:mm')
    where.time = {[db.Sequelize.Op.gte]: today.format('YYYY-MM-DD hh:mm'), [db.Sequelize.Op.lt]: tomorrow}

    try {
      return await readingModel.findAll({
        where: where,
        order: [['time', 'ASC']],
        attributes: ['time', 'reading'],
        limit: 24
      })
    } catch (e) {
      error(e)
      throw new Error('Unable to get readings')
    }
  },
  async saveMany (data) {
    try {
      await readingModel.bulkCreate(data)
    } catch (e) {
      error(e)
      throw new Error('Unable to save readings')
    }
  }
}

export default reading
