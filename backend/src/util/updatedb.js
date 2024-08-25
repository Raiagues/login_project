const memberModel = require('../models/members.js')
const bcrypt = require('bcrypt');

(async () => {
  await require('../models/database.js').sync({ force: true })
  console.log('Base de données créée.')

  const passhash = await bcrypt.hash('123456', 2)
  console.log(passhash)
  await memberModel.create({
    name: 'User Test A', email: 'user_test_1@gmail.com', passhash, isAdmin: true
  })

  await memberModel.create({
    name: 'User Test B', email: 'user_test_2@gmail.com', passhash
  })
})()
