const Sequelize = require('sequelize')
const db = require('./database.js')
const members = db.define('members', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(128),
    validate: {
      is: /^[a-z\-'\s]{1,128}$/i
    }
  },
  email: {
    type: Sequelize.STRING(128),
    unique: true,
    validate: {
      isEmail: true
    }
  },
  passhash: {
    type: Sequelize.STRING(60),
    validate: {
      is: /^[0-9a-z\\/$.]{60}$/i
    }
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isCurrentMember: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  position: {
    type: Sequelize.STRING(128)
  },
  description: {
    type: Sequelize.TEXT
  },
  yearJoined: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true,
      min: 2022,
      max: new Date().getFullYear()
    }
  },
  imgPath: {
    type: Sequelize.STRING(128),
    defaultValue: ''
  },
  linkedinLink: {
    type: Sequelize.STRING(256),
    validate: {
      isUrl: true
    }
  },
  cvLink: {
    type: Sequelize.STRING(256),
    validate: {
      isUrl: true
    }
  },
  lattesLink: {
    type: Sequelize.STRING(256),
    validate: {
      isUrl: true
    }
  },
  githubLink: {
    type: Sequelize.STRING(256),
    validate: {
      isUrl: true
    }
  }
}, { timestamps: false })
module.exports = members
