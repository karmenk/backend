import Debug from 'debug'
import dayjs from 'dayjs'
import db, {readingModel} from '../models'

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
    const today = dayjs(date)
    const tomorrow = today.add(1, 'day').format('YYYY-MM-DD')
    where.time = {[db.Sequelize.Op.gte]: date, [db.Sequelize.Op.lt]: tomorrow}

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
