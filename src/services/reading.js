import Debug from 'debug'
import dayjs from 'dayjs'
import db, { readingModel } from '../models'

// const debug = Debug('ReadingService:debug')
const error = Debug('ReadingService:error')

let reading = {
  async findByClientIdAndDate (clientId, date) {
    let where = {clientId: clientId}
    let [ today, tomorrow ] = this.calculateDates(date)
    where.time = {[db.Sequelize.Op.gte]: today, [db.Sequelize.Op.lt]: tomorrow}
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
  },
  calculateDates (date) {
    const today = dayjs(date).add(1, 'hour')
    const tomorrow = today.add(24, 'hours').format('YYYY-MM-DD HH:mm')
    return [today.format('YYYY-MM-DD HH:mm'), tomorrow]
  }
}

export default reading
