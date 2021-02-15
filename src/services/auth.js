import { accountModel, userModel } from '../models/index'
import Debug from 'debug'

// const debug = Debug('AuthService:debug')
const error = Debug('AuthService:error')

let auth = {
  async getAccountById (accountId) {
    let account
    try {
      account = await accountModel.findOne({
        where: { id: accountId, active: true },
        include: { model: userModel }
      })
    } catch (e) {
      error(e)
      throw new Error('Unable to find account')
    }
    if (!account) {
      throw new Error('Requested user account was not found')
    }
    return {
      userId: account.dataValues.userId,
      username: account.dataValues.username,
      clientId: account.dataValues.user.dataValues.clientId,
      accountId: account.dataValues.id
    }
  },
  async getAccountByUsername (username) {
    let account = await accountModel.findOne({
      where: { username: username, active: true },
      include: { model: userModel }
    })
    if (!account) {
      throw new Error('User not found')
    }
    return {
      accountId: account.dataValues.id,
      userId: account.dataValues.userId,
      username: account.dataValues.username,
      password: account.dataValues.password,
      clientId: account.dataValues.user.dataValues.clientId
    }
  }
}

export default auth
