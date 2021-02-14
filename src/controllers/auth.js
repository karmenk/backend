import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
// import Debug from 'debug'
import AuthService from '../services/auth'

// const debug = Debug('AuthController:debug')
// const error = Debug('AuthController:error')

let auth = {
  async getToken (username, password) {
    let account
    try {
      account = await AuthService.getAccountByUsername(username)
    } catch (e) {
      throw new Error(e)
    }

    const result = await bcrypt.compare(password, account.password)
    if (!result) {
      throw new Error('Password is incorrect.')
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
    if (!Object.prototype.hasOwnProperty.call(tokenData, 'accountId')) {
      throw new Error('Token missing required payload')
    }

    return await AuthService.getAccountById(tokenData.accountId)
  }
}

export default auth
