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
  briefDescription: {
    type: Sequelize.TEXT
  },
  description: {
    type: Sequelize.TEXT
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING(128)
  },
  remainingPlaces: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  link: {
    type: Sequelize.STRING(128),
    defaultValue: ''
  },
  projectId: {
    type: Sequelize.INTEGER,
    references: {
      model: projects,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  activityNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, { timestamps: false })

module.exports = activities
