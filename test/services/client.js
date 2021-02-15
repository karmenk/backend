import test from 'ava'
import {} from 'dotenv/config'
import sinon from 'sinon'
import db, { clientModel, accountModel, userModel, readingModel } from '../../src/models/index'
import ClientService from '../../src/services/client'

test.before(async () => {
  await db.sequelize.sync()
})

test('getAllActive only returns active', async t => {
  await clientModel.bulkCreate([
    { id: 1, name: 'client1', active: true },
    { id: 2, name: 'client2', active: false },
    { id: 3, name: 'client3', active: true },
  ])
  const result = await ClientService.getAllActive()
  t.is(result.length, 2)
  t.true(Array.isArray(result))
})

test('getAllActive returns no results', async t => {
  const result = await ClientService.getAllActive()
  t.is(result.length, 0)
  t.true(Array.isArray(result))
})

test('getAllActive throws on db error', async t => {
  sinon.stub(clientModel, 'findAll').throws()
  const error = await t.throwsAsync(ClientService.getAllActive())
  t.is(error.message, 'Unable to get clients')
  clientModel.findAll.restore()
})

test.afterEach.always(async () => {
    await accountModel.destroy({ truncate: { cascade: true }})
    await userModel.destroy({ truncate: { cascade: true }})
    await readingModel.destroy({ truncate: { cascade: true }})
    await clientModel.destroy({ truncate: { cascade: true }})
})
