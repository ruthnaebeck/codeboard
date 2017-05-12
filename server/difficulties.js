const db = require('APP/db')
const Question = db.model('questions')
const Difficulty = db.model('difficulties')

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    Difficulty.findAll({
      include: [Question],
      order: [
        ['id', 'ASC'],
        [ Question, 'id', 'ASC' ]
      ]
    })
    .then(questions => {
      res.json(questions)
    })
    .catch(next)
  })
