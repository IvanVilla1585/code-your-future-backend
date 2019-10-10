'use strict'

const express = require('express')
const bodyParse = require('body-parser')

const authInit = require('./routes/auth')

function initApp () {
  const app = express()

  app.use(bodyParse.json())

  authInit(app)

  return app
}

module.exports = initApp
