'use strict'

const {ENUM, INTEGER} = require('sequelize')

module.exports = db => db.define('difficulties', {
  level: ENUM('Easy', 'Medium', 'Hard'),
  minutes: INTEGER
})

module.exports.associations = (Difficulty, {Question}) => {
  Difficulty.hasMany(Question)
}
