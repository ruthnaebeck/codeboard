const db = require('APP/db')
const Question = db.model('questions')
const Hint = db.model('hints')
const UserQuestion = db.model('users_questions')
const {mustBeLoggedIn} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/:id', (req, res, next) => {
    Question.findOne({
      where: {
        id: req.params.id
      },
      include: [Hint],
      order: [
        [ Hint, 'id', 'ASC' ]
      ]
    })
    .then(question => res.json(question))
    .catch(next)
  })
  .get('/:id/user', mustBeLoggedIn,
    (req, res, next) => {
      UserQuestion.findOne({
        where: {
          user_id: req.user.id,
          question_id: req.params.id
        }
      })
      .then(question => res.json(question))
      .catch(next)
    })
