'use strict'

const {STRING, TEXT, ARRAY, JSON} = require('sequelize')

module.exports = db => db.define('users_questions', {
  status: STRING,
  user_answer: TEXT,
  user_drawing: ARRAY(JSON)
})

module.exports.associations = (UserQuestion, { Question }) => {
  UserQuestion.belongsTo(Question)
}
