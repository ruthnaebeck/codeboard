'use strict'

const { STRING, TEXT, ARRAY, JSON } = require('sequelize')

module.exports = db => db.define('questions', {
  name: STRING,
  text: TEXT,
  solution: TEXT,
  tests: ARRAY(JSON)
})

module.exports.associations = (Question, { Category, Difficulty, Hint, User }) => {
  Question.belongsTo(Category)
  Question.belongsTo(Difficulty)
  Question.hasMany(Hint)
  Question.belongsToMany(User, {through: 'users_questions'})
}
