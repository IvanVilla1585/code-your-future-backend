'use strict'

let posts = [
  {
    id: 1,
    autor: 'Ivan Vila',
    body: 'Code your future'
  },
  {
    id: 2,
    autor: 'Juan Ramirez',
    body: 'Test Code Your Future'
  },
  {
    id: 3,
    autor: 'Helen Vila',
    body: 'Test'
  }
]

module.exports = function (app) {
  app.get('/posts', (req, res, next) => {
    return res.status(200).json(posts)
  })

  app.post('/posts', (req, res, next) => {
    const { body } = req
    body.id = posts.length + 1
    posts.push(body)
    return res.status(201).json(body)
  })

  app.get('/posts/:id', (req, res, next) => {
    const { id } = req.params
    if (isNaN(id)) {
      return res.status(400).json('Invalid param')
    }
    const post = posts.find(element => element.id === parseInt(id,10))
    if (post) {
      return res.status(200).json(post)
    }
    return res.status(404).json('Not found')
  })

  app.delete('/posts/:id', (req, res, next) => {
    const { id } = req.params
    if (isNaN(id)) {
      return res.status(400).json('Invalid param')
    }
    const copy = [...posts]
    posts = posts.filter(element => element.id !== parseInt(id,10))
    if (copy.length > posts.length) {
      return res.status(200).json(posts)
    }
    return res.status(404).json('Not found')
  })
}
