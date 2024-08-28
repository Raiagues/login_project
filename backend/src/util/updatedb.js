const memberModel = require('../models/members.js')
const projectModel = require('../models/projects.js')
const bcrypt = require('bcrypt');

(async () => {
  await require('../models/database.js').sync({ force: true })
  console.log('Base de données créée.')

  const passhash = await bcrypt.hash('123456', 2)
  console.log(passhash)
  await memberModel.create({
    name: 'User Test A',
    email: 'user_test_1@gmail.com',
    passhash,
    isAdmin: true,
    position: 'Presidente'
  })

  await memberModel.create({
    name: 'User Test B',
    email: 'user_test_2@gmail.com',
    passhash
  })

  await projectModel.create({
    name: 'Project Alpha',
    briefDescription: 'A short description of Project Alpha.',
    description: 'A detailed description of what Project Alpha is about.',
    origin: 'The origin story of Project Alpha.',
    shortTermGoals: 'Goals to be achieved within the first 6 months.',
    midTermGoals: 'Goals to be achieved within the first 2 years.',
    longTermGoals: 'Goals for the long-term future of the project.'
  })

  await projectModel.create({
    name: 'Project Beta',
    briefDescription: 'A short description of Project Beta.',
    description: 'A detailed description of what Project Beta is about.',
    origin: 'The origin story of Project Beta.',
    shortTermGoals: 'Immediate goals for Project Beta.',
    midTermGoals: 'Mid-term goals for Project Beta.',
    longTermGoals: 'Long-term goals for Project Beta.'
  })
})()
