import Debug from 'debug'
import { clientModel } from '../models'

// const debug = Debug('ClientService:debug')
const error = Debug('ClientService:error')

let client = {
  async getAllActive () {
    try {
      return await clientModel.findAll({where: {active: true}})
    } catch (e) {
      error(e)
      throw new Error('Unable to get clients')
    }
  }
}

export default client
