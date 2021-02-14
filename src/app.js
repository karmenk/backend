import express from 'serverless-express/express'
import cors from 'cors'
import Debug from 'debug'
import bodyParser from 'body-parser'
import middleware from './middleware'
import Reading from './controllers/reading'
import Auth from './controllers/auth'

const app = express()

const corsOptions = {
  origin: process.env.CORS_ORIGIN
}

const debug = Debug('server:debug')
// const info = Debug('server:info')
// const error = Debug('server:error')

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/login', middleware.authenticateToken, async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  if (!username || !password) {
    return res.status(400).json({
      type: 'error',
      message: 'username and password fields are required'
    })
  }
  const result = await Auth.getToken(username, password)
  debug(result)
  res.send(result)
})

app.get('/user', middleware.authenticateToken, async (req, res) => {
  const token = req.headers['x-access-token']
  if (!token) {
    return res.status(400).json({
      type: 'error',
      message: 'x-access-token header not found.'
    })
  }
  const result = await Auth.getUser(token)
  res.send(result)
})

app.get('/reading/:id', middleware.authenticateToken, async (req, res) => {
  debug(req.params.id)
  debug(req.query)
  try {
    const response = await Reading.getByDateAndClientId(req.params.id, req.query)
    res.send(response)
  } catch(e) {
    res.send(e)
  }
})

app.post('/reading', middleware.authenticateToken, async (req, res) => {
  debug('post reading')
  try {
    const response = await Reading.save(req.body)
    res.send(response)
  } catch(e) {
    res.send(e)
  }
})

app.get('/reading', middleware.authenticateToken, async (req, res) => {
  debug('Get reading')
  try {
    const response = await Reading.getAll()
    res.send(response)
  } catch(e) {
    res.send(e)
  }
})

export default app
