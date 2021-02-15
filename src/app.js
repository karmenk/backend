import express from 'serverless-express/express'
import cors from 'cors'
// import Debug from 'debug'
import bodyParser from 'body-parser'
import authenticateToken from './middleware'
import Reading from './controllers/reading'
import Auth from './controllers/auth'

const app = express()

const corsOptions = {
  origin: process.env.CORS_ORIGIN
}

// const debug = Debug('server:debug')

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/user', authenticateToken, async (req, res) => {
  const token = req.headers['x-access-token']
  if (!token) {
    return res.status(400).json({
      type: 'error',
      message: 'x-access-token header not found.'
    })
  }
  try {
    const result = await Auth.getUser(token)
    res.send(result)
  } catch (e) {
    res.status(400).json({
      type: 'error',
      message: e.message
    })
  }
})

app.post('/login', authenticateToken, async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  if (!username || !password) {
    return res.status(400).json({
      type: 'error',
      message: 'Username and password are required'
    })
  }
  try {
    const result = await Auth.getToken(username, password)
    res.send(result)
  } catch (e) {
    return res.status(400).json({
      type: 'error',
      message: e.message
    })
  }
})

app.get('/reading/:id', async (req, res) => {
  const date = req.query.d
  try {
    const response = await Reading.getByClientId(req.params.id, date)
    res.send(response)
  } catch(e) {
    return res.status(400).json({
      type: 'error',
      message: e.message
    })
  }
})

app.post('/reading', authenticateToken, async (req, res) => {
  try {
    const response = await Reading.save(req.body)
    res.send(response)
  } catch(e) {
    return res.status(400).json({
      type: 'error',
      message: e.message
    })
  }
})

export default app
