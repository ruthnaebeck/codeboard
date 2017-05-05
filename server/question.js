const db = require('APP/db')
const Question = db.model('questions')
const Synthesize = require('./textToSpeech.js')

module.exports = require('express').Router()
  .get('/:id', (req, res, next) => {
    Question.findById(req.params.id)
    .then(question => {
      Synthesize(question.text)
    })
    .then(question => res.json(question))
    .catch(next)
  })
