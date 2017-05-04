const db = require('APP/db')
const Question = db.model('questions')
const Category = db.model('categories')
const Difficulty = db.model('difficulties')

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    Category.findAll({
      include: [Question]
    })
    .then(questions => {
      res.json(questions)
    })
    .catch(next)
  })
