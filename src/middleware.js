import jwt from 'jsonwebtoken'

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403)
    if (!Object.prototype.hasOwnProperty.call(payload, 'service') || payload.service !== 'frontend') {
      return res.sendStatus(403)
    }
    next() // pass the execution off to whatever request the client intended
  })
}

export default authenticateToken
