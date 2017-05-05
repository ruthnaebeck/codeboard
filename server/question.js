const db = require('APP/db')
const Question = db.model('questions')

module.exports = require('express').Router()
  .get('/:id', (req, res, next) => {
    Question.findById(req.params.id)
    .then(question => {
      res.json(question)
    })
    .catch(next)
  })
