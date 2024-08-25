const express = require('express')
const router = express.Router()
const project = require('../controllers/project.js')

router.get('/api/projects', project.getProjects)
router.post('/api/projects', project.newProject)
router.put('/api/projects/:id', project.updateProject)
router.delete('/api/projects/:id', project.deleteProject)

module.exports = router
