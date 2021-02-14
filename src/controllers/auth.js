import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Debug from 'debug'
import { accountModel, userModel, clientModel } from '../models/index'

const debug = Debug('AuthController:debug')
// const info = Debug('ReadingController:info')
const error = Debug('AuthController:error')

let auth = {
  async getToken (username, password) {
    let account = await accountModel.findOne({
      where: { username: username },
      include: { model: userModel }
    })
    if (!account) {
      return 'User not found'
    }
    account = account.dataValues

    const result = await bcrypt.compare(password, account.password)
    debug(error)
    debug(result)

    if (!result) {
      return 'Password is incorrect.'
    }
    const userData = {
      userId: account.userId,
      username: account.username,
      clientId: account.user.dataValues.clientId,
      accountId: account.id
    }
    return {
      type: 'success',
      message: 'User logged in.',
      user: userData,
      token: jwt.sign(userData, process.env.JWT_TOKEN)
    }
  },
  async getUser (token) {
    const tokenData = jwt.decode(token)
    let account = await accountModel.findOne({
      where: { id: tokenData.accountId },
      include: { model: userModel }
    })
    if (!account) {
      return 'User not found'
    }
    return {
      userId: account.dataValues.userId,
      username: account.dataValues.username,
      clientId: account.dataValues.user.dataValues.clientId,
      accountId: account.dataValues.id
    }
  },
  verifyToken (token) {
    jwt.verify(token, process.env.JWT_TOKEN, (error, result) => {
      if (error) {
        return 'Token is invalid'
      }
      return {
        type: 'success',
        message: 'Provided token is valid.',
        result
      }
    })
  }
}

export default auth
