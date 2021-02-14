import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import db, { readingModel } from '../models/index'
import Debug from 'debug'

const debug = Debug('ReadingController:debug')
// const info = Debug('ReadingController:info')
const error = Debug('ReadingController:error')

dayjs.extend(customParseFormat)

let reading = {
  async save (records) {
    let insert = []

    records.map(r => {
      const body = JSON.parse(r.body)
      insert.push({
        clientId: body.clientId,
        time: body.time,
        reading: body.reading
      })
    })

    try {
      await readingModel.bulkCreate(insert)
    } catch (e) {
      error(e)
      // return e
    }
  },
  async getAll () {
    try {
      return await readingModel.findAll({})
    } catch (e) {
      error(e)
      // return e
    }
  },
  async getByDateAndClientId (id, query) {
    // debug(query)
    let where = {clientId: id}
    // debug(where)
    // if (query.hasOwnProperty('d')) {
    //   const today = dayjs(query.d)
    //   const tomorrow = today.add(1, 'day').format('YYYY-MM-DD');
    //   debug(tomorrow)
    //   where.time = {[db.Sequelize.Op.gte]: db.sequelize.cast('2021-01-13', 'date'), [db.Sequelize.Op.lt]: '2021-01-14'}
    // }
    // debug('where:')
    // debug(where)
    try {
      return await readingModel.findAll({
        where: where,
        order: [['time', 'ASC']],
        attributes: ['time', 'reading'],
        limit: 24
      })
    } catch (e) {
      error(e)
      // return e
    }
  }
}

export default reading
