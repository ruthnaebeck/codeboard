'use strict'

const api = module.exports = require('express').Router()
const Synthesize = require('./textToSpeech')

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .get('/whiteboard', (req, res, next) => {
    Synthesize()
  })

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
