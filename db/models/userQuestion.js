'use strict'

const {STRING, TEXT} = require('sequelize')

module.exports = db => db.define('users_questions', {
  status: STRING,
  user_answer: TEXT
})
