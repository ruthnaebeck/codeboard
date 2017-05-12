const db = require('APP/db')
const Question = db.model('questions')
const Category = db.model('categories')

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    Category.findAll({
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
