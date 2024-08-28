const express = require('express')
const router = express.Router()
const member = require('../controllers/member.js')
const access = require('../controllers/access.js')

// Get All members names and emails
router.get('/api/members', access.verifyTokenPresent, member.getMembers)
// Get All members informations
router.get('/api/members/:id', access.verifyTokenPresent, member.getMemberInfo)
// Add new member
router.post('/api/members', access.verifyTokenPresent, access.isAdmin, member.newMember)
// Update member's information
router.put('/api/members/:id', access.verifyTokenPresent, access.isAdmin, member.updateMember)
// Delete a member
router.delete('/api/members/:id', access.verifyTokenPresent, access.isAdmin, member.deleteMember)
// Verify credentials of user using email and password and return token
router.post('/login', member.login)

module.exports = router
