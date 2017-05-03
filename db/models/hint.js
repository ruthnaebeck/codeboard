'use strict'

const {STRING, TEXT, DOUBLE, INTEGER} = require('sequelize')

module.exports = db => db.define('hints', {
  text: TEXT
})

module.exports.associations = (Hint, {Question}) => {
  Hint.belongsTo(Question)
}
