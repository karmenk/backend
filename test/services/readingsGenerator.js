import test from 'ava'
import {} from 'dotenv/config'
import sinon from 'sinon'
import db, { clientModel, accountModel, userModel, readingModel } from '../../src/models/index'
import ReadingsGeneratorService from '../../src/services/readingsGenerator'
import ClientService from '../../src/services/client'

test.before(async () => {
  await db.sequelize.sync()
})

test('generate returns empty array when no clients', async t => {
  const result = await ReadingsGeneratorService.generate()
  t.true(Array.isArray(result))
  t.is(result.length, 0)
})

test('generate returns empty array on db error', async t => {
  sinon.stub(ClientService, 'getAllActive').throws()
  const result = await ReadingsGeneratorService.generate()
  t.true(Array.isArray(result))
  t.is(result.length, 0)
  ClientService.getAllActive.restore()
})

test('generate returns correct data', async t => {
  await clientModel.bulkCreate([
    { id: 1, name: 'client1', active: true },
    { id: 2, name: 'client2', active: false }
  ])
  const result = await ReadingsGeneratorService.generate()
  t.true(Array.isArray(result))
  t.is(result.length, 1)
  t.deepEqual(Object.getOwnPropertyNames(result[0]), ['id', 'time', 'reading'])
})

test('createBatch returns correct data', async t => {
  const data = [{ id: 1, time: 1613428670997, reading: 35 }]
  const result = await ReadingsGeneratorService.createBatch(data)
  const expected = '{"clientId":1,"time":1613428670997,"reading":35}'
  t.deepEqual(Object.getOwnPropertyNames(result), ['QueueUrl', 'Entries'])
  t.true(Array.isArray(result.Entries))
  t.is(result.Entries.length, 1)
  t.deepEqual(Object.getOwnPropertyNames(result.Entries[0]), ['Id', 'MessageBody'])
  t.is(result.Entries[0].MessageBody, expected)
})

test.afterEach.always(async () => {
    await accountModel.destroy({ truncate: { cascade: true }})
    await userModel.destroy({ truncate: { cascade: true }})
    await readingModel.destroy({ truncate: { cascade: true }})
    await clientModel.destroy({ truncate: { cascade: true }})
})
