const db = require('APP/db')
const Question = db.model('questions')
const Hint = db.model('hints')

module.exports = require('express').Router()
  .get('/:id', (req, res, next) => {
    Question.findOne({
      where: {
        id: req.params.id
      },
      include: [Hint]
    })
    .then(question => res.json(question))
    .catch(next)
  })
