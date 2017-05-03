'use strict'

const { STRING, TEXT } = require('sequelize')

module.exports = db => db.define('questions', {
  name: STRING,
  text: TEXT,
  solution: TEXT,
  tests: TEXT
})

module.exports.associations = (Question, { Category, Difficulty, Hint }) => {
  Question.belongsTo(Category)
  Question.belongsTo(Difficulty)
  Question.hasMany(Hint)
}
