const Sequelize = require('sequelize')
const db = require('./database.js')
const projects = db.define('projects', {
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
  origin: {
    type: Sequelize.TEXT
  },
  shortTermGoals: {
    type: Sequelize.TEXT
  },
  midTermGoals: {
    type: Sequelize.TEXT
  },
  longTermGoals: {
    type: Sequelize.TEXT
  }
}, { timestamps: false })
module.exports = projects
