'use strict'

const { TEXT } = require('sequelize')

module.exports = db => db.define('hints', {
  text: TEXT
})

module.exports.associations = (Hint, { Question }) => {
  Hint.belongsTo(Question)
}
