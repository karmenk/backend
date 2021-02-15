import test from 'ava'
import {} from 'dotenv/config'
import sinon from 'sinon'
import db, { clientModel, accountModel, userModel, readingModel } from '../../src/models/index'
import AuthService from '../../src/services/auth'

test.before(async () => {
  await db.sequelize.sync()
})

test('getAccountById throws on db error', async t => {
  sinon.stub(accountModel, 'findOne').throws()
  const error = await t.throwsAsync(AuthService.getAccountById(1))
  t.is(error.message, 'Unable to find account')
  accountModel.findOne.restore()
})

test('getAccountById throws unable to find account', async t => {
  const error = await t.throwsAsync(AuthService.getAccountById(1))
  t.is(error.message, 'Requested user account was not found')
})

test('getAccountById throws unable to find account if account inactive', async t => {
  await clientModel.create({ id: 1, name: 'client1', active: true })
  await userModel.create({ id: 2, clientId: 1 })
  await accountModel.create({ id: 3, userId: 2, username: 'user1', 'password': 'pass1', active: false })
  const error = await t.throwsAsync(AuthService.getAccountById(3))
  t.is(error.message, 'Requested user account was not found')
})

test('getAccountById returns account and user', async t => {
  await clientModel.create({ id: 1, name: 'client1', active: true })
  await userModel.create({ id: 2, clientId: 1 })
  await accountModel.create({ id: 3, userId: 2, username: 'user1', 'password': 'pass1', active: true })
  const result = await AuthService.getAccountById(3)
  const expected = {
    userId: 2,
    username: 'user1',
    clientId: 1,
    accountId: 3
  }
  t.deepEqual(result, expected)
})

test('getAccountByUsername throws user not found', async t => {
  await clientModel.create({ id: 1, name: 'client1', active: true })
  await userModel.create({ id: 2, clientId: 1 })
  await accountModel.create({ id: 3, userId: 2, username: 'user1', 'password': 'pass1', active: true })
  const error = await t.throwsAsync(AuthService.getAccountByUsername('user2'))
  t.is(error.message, 'User not found')
})

test('getAccountByUsername throws user not found on inactive account', async t => {
  await clientModel.create({ id: 1, name: 'client1', active: true })
  await userModel.create({ id: 2, clientId: 1 })
  await accountModel.create({ id: 3, userId: 2, username: 'user1', 'password': 'pass1', active: false })
  const error = await t.throwsAsync(AuthService.getAccountByUsername('user1'))
  t.is(error.message, 'User not found')
})

test('getAccountByUsername returns user and account', async t => {
  await clientModel.create({ id: 1, name: 'client1', active: true })
  await userModel.create({ id: 2, clientId: 1 })
  await accountModel.create({ id: 3, userId: 2, username: 'user1', 'password': 'pass1', active: true })
  const result = await AuthService.getAccountByUsername('user1')
  const expected = {
    accountId: 3,
    userId: 2,
    username: 'user1',
    password: 'pass1',
    clientId: 1
  }
  t.deepEqual(result, expected)
})

test.afterEach.always(async () => {
    await accountModel.destroy({ truncate: { cascade: true }})
    await userModel.destroy({ truncate: { cascade: true }})
    await readingModel.destroy({ truncate: { cascade: true }})
    await clientModel.destroy({ truncate: { cascade: true }})
})
