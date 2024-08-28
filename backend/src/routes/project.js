const express = require('express')
const router = express.Router()
const project = require('../controllers/project.js')
const access = require('../controllers/access.js')

// Get all projects name and brief description
router.get('/api/projects', access.verifyTokenPresent, project.getProjects)
// Get a project informations
router.get('/api/projects/:pid', access.verifyTokenPresent, project.getProjectInformations)
// Add an activity to project (only for admins)
// router.put('/api/projects/:pid/:aid', access.verifyTokenPresent, access.isAdmin, project.addActityToProject)
// // Delete an activity to project (only for admins)
// router.delete('/api/projects/:pid/:aid', access.verifyTokenPresent, access.isAdmin, project.deleteActityFromProject)
// // List all activities of the project
// router.get('/api/projects/:pid/activities', access.verifyTokenPresent, project.getProjectActivities)
// Create a new project (only for admins)
router.post('/api/projects', access.verifyTokenPresent, access.isAdmin, project.newProject)
// Update a project (only for admins)
router.put('/api/projects/:pid', access.verifyTokenPresent, access.isAdmin, project.updateProject)
// Delete a project (only for admins)
router.delete('/api/projects/:pid', access.verifyTokenPresent, access.isAdmin, project.deleteProject)

module.exports = router
