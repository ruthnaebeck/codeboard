'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('favorites')

module.exports.associations = (Favorite, {User}) => {
  Favorite.belongsTo(User)
}
