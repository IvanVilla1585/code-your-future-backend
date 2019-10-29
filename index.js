'use strict'

const initApp = require('./src/app')

const createConnection = require('./src/libs')
const { validateToken } = require('./src/middleware')

createConnection()

const app = initApp()

app.get('/users', validateToken,  (req, res, next) => {
  console.log(req.user)
  res.send('ok')
})


app.listen(3000, () => {
  console.log('Server listening on port 3000')
})