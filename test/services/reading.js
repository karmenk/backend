import test from 'ava'
import {} from 'dotenv/config'
import sinon from 'sinon'
import db, { clientModel, accountModel, userModel, readingModel } from '../../src/models/index'
import ReadingService from '../../src/services/reading'

test.before(async () => {
  await db.sequelize.sync()
})

test('calculateDates returns correct dates', t => {
  t.deepEqual(ReadingService.calculateDates('2021-02-14'), ['2021-02-14 01:00', '2021-02-15 01:00'])
})

test('saveMany saves correctly', async t => {
  const client = await clientModel.create({ name: 'client1', active: true })
  const data = [
    { clientId: client.id, time: '2021-02-15 19:00:23.297+00', reading: '27' },
    { clientId: client.id, time: '2021-02-15 18:00:23.297+00', reading: '54' },
  ]
  await ReadingService.saveMany(data)
  const res = await readingModel.findAll()
  t.is(res.length, 2)
})

test('saveMany throws on unsuccessful save', async t => {
  sinon.stub(readingModel, 'bulkCreate').throws()
  const error = await t.throwsAsync(ReadingService.saveMany({}))
  t.is(error.message, 'Unable to save readings')
  readingModel.bulkCreate.restore()
})

test('findByClientIdAndDate returns no results for client', async t => {
  await clientModel.create({ id: 1, name: 'client1', active: true })
  await readingModel.bulkCreate([
    { clientId: 1, time: '2021-02-15 19:00:23.297+00', reading: '27' },
    { clientId: 1, time: '2021-02-15 18:00:23.297+00', reading: '54' },
  ])
  const result = await ReadingService.findByClientIdAndDate(999, '2021-02-15')
  t.is(result.length, 0)
})

test('findByClientIdAndDate returns correct data', async t => {
  await clientModel.bulkCreate([
    { id: 1, name: 'client1', active: true },
    { id: 2, name: 'client2', active: true },
  ])
  await readingModel.bulkCreate([
    { clientId: 1, time: '2021-02-15 19:00:23.297+00', reading: '27' },
    { clientId: 1, time: '2021-02-15 18:00:23.297+00', reading: '54' },
    { clientId: 2, time: '2021-02-15 19:00:23.297+00', reading: '24' },
    { clientId: 2, time: '2021-02-15 17:00:23.297+00', reading: '15' },
    { clientId: 2, time: '2021-02-14 22:00:23.297+00', reading: '61' },
    { clientId: 2, time: '2021-02-15 23:00:23.297+00', reading: '25' },
  ])
  const result = await ReadingService.findByClientIdAndDate(2, '2021-02-15')
  t.is(result.length, 2)
  t.is(result[0].reading, '15')
  t.is(result[1].reading, '24')
})

test('findByClientIdAndDate throws on db error', async t => {
  sinon.stub(readingModel, 'findAll').throws()
  const error = await t.throwsAsync(ReadingService.findByClientIdAndDate({}))
  t.is(error.message, 'Unable to get readings')
  readingModel.findAll.restore()
})

test.afterEach.always(async () => {
    await accountModel.destroy({ truncate: { cascade: true }})
    await userModel.destroy({ truncate: { cascade: true }})
    await readingModel.destroy({ truncate: { cascade: true }})
    await clientModel.destroy({ truncate: { cascade: true }})
})
