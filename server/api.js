'use strict'

const api = module.exports = require('express').Router()
const db = require('APP/db')
const Question = db.model('questions')

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/categories', require('./categories'))
  .use('/difficulties', require('./difficulties'))
  .use('/question', require('./question'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())

