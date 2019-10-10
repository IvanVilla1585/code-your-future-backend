'use strict'

const bcrypt = require('bcrypt')

const { validateData } = require('../utils')

const users = [
  { 
    name: 'Dulce Osman',
    email: 'test@test.com',
    password: '$2b$10$sPHIpHjY.bJtD1H0cTGnQ..TY1vsrA8jOOoOS1Pv0S86Au4yGm1uS' 
  }
]

function authInit (app) {

  app.post('/auth/login', async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Invalid data' })
    }

    const user = users.find(item => item.email === email)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    try {
      const compare = await bcrypt.compare(password, user.password)
      console.log('compare', compare)
      if (compare) {
        delete user.password
        
        return res.status(200).json(user)
      }
    } catch (err) {

    }

    res.status(404).json({ message: 'Usuario o contraseña invalidos' })
  })

  app.post('/auth/sing-up', async (req, res, next) => {
    const { body } = req
    console.group('body', body)
    const valid = validateData(
      ['name', 'email', 'password'],
      body
    )

    if (!valid) {
      return res.status(400).json({ message: 'Invalid data' })
    }

    const user = users.find(item => item.email === body.email)

    if (user) {
      return res.status(400).json({ message: "este corre ya esta registrado "})
    }

    try {
      const passwordHash = await bcrypt.hash(body.password, 10)
      body.password = passwordHash
      users.push(body)
    } catch (err) {
      return res.status(500).send('Internal server error')
    }
    console.log(users)
    res.status(201).json({ message: "Ok" })
  })
}

module.exports = authInit
