'use strict'

const api = module.exports = require('express').Router()
const Synthesize = require('./textToSpeech')
const db = require('APP/db')
const Question = db.model('questions')

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  // @ Ruth and Cigdem, we're going to move this to the right place after merge
  .get('/question/:id', (req, res, next) => {
    Question.findById(req.params.id)
    .then(question => {
      console.log('WHATS QUESTION? ', question.text)
      Synthesize(question.text)
    })
    .catch(next)
  })

// No routes matched? 404.
api.use((req, res) => res.status(404).end())

