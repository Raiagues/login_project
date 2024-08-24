const express = require('express')
const router = express.Router()
const user = require('../controllers/user.js')

router.get('/api/users', user.getUsers)
router.post('/api/users', user.newUser)
router.put('/api/users/:id', user.updateUser)
router.delete('/api/users/:id', user.deleteUser)
router.post('/login', user.login)

module.exports = router
