const Sequelize = require('sequelize')
const db = require('./database.js')
const projects = require('./projects.js')
const activities = require('./activity.js')
const projectActivity = db.define('projectActivity', {
  projectId: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: projects,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  activityId: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: activities,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, { timestamps: false })
module.exports = projectActivity
