const express = require('express')
const router = express.Router()
const activity = require('../controllers/activity.js')
const access = require('../controllers/access.js')

// Get All activities
router.get('/api/projects/:pid/activities', access.verifyTokenPresent, activity.getActivities)
// Get activity's information
router.get('/api/projects/:pid/activities/:aid', access.verifyTokenPresent, activity.getActivity)
// Create a new activity (only for admins)
router.post('/api/projects/:pid/activities', access.verifyTokenPresent, access.isAdmin, activity.newActivity)
// Update activity's information (only for admins)
router.put('/api/projects/:pid/activities/:aid', access.verifyTokenPresent, access.isAdmin, activity.updateActivity)
// Delete an activity (only for admins)
router.delete('/api/projects/:pid/activities/:aid', access.verifyTokenPresent, access.isAdmin, activity.deleteActivity)

module.exports = router
