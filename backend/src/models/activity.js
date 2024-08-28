const Sequelize = require('sequelize')
const db = require('./database.js')
const projects = require('./projects.js')
const activities = db.define('activities', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(128),
    validate: {
      is: /^[a-z\-'\s]{1,128}$/i
    },
    unique: true
  },
  projectId: {
    type: Sequelize.INTEGER,
    references: {
      model: projects,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, { timestamps: false })
module.exports = activities
