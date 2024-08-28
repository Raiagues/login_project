const projectModel = require('../models/projects.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')

module.exports = {
  async getProjects (req, res) {
    // #swagger.tags = ['Projects']
    // #swagger.summary = 'List all projects'

    const projects = await projectModel.findAll({ attributes: ['id', 'name', 'briefDescription'] })
    res.json({ status: true, message: 'Returning all projects', projects })
  },

  async getProjectInformations (req, res) {
    // #swagger.tags = ['Projects']
    // #swagger.summary = 'List informations from project'

    // Fetch projects based on the provided project ID
    const projects = await projectModel.findAll({
      attributes: ['id', 'name', 'description', 'origin', 'shortTermGoals', 'midTermGoals', 'longTermGoals'],
      where: { id: req.params.pid }
    })

    // Check if the projects array is empty
    if (projects.length === 0) {
      return res.json({
        status: false,
        message: 'No project found with the given ID',
        projects: []
      })
    }
    res.json({ status: true, message: 'Returning all informations from project', projects })
  },

  async newProject (req, res) {
    // #swagger.tags = ['Projects']
    // #swagger.summary = 'Create a new project (only for admins)'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $name: 'New project', $briefDescription: 'blablablabla', $description: '...', $origin: '...', $shortTermGoals: '...', $midTermGoals: '...', $longTermGoals: '...' }}

    // Check if the project name is missing in the request body
    if (!has(req.body, 'name')) {
      throw new CodeError('Missing project name', 400)
    }

    // Check if a project with the same name already exists
    const projectExists = await projectModel.findOne({
      attributes: ['name'],
      where: { name: req.body.name }
    })

    if (projectExists != null) {
      throw new CodeError('This project already exists', 400)
    }

    // Create the project with all possible fields from the request body
    await projectModel.create({
      name: req.body.name,
      briefDescription: req.body.briefDescription,
      description: req.body.description,
      origin: req.body.origin,
      shortTermGoals: req.body.shortTermGoals,
      midTermGoals: req.body.midTermGoals,
      longTermGoals: req.body.longTermGoals
    })

    // Return a success message
    res.json({ status: true, message: 'Created project' })
  },

  async updateProject (req, res) {
    // #swagger.tags = ['Projects']
    // #swagger.summary = 'Update a project (only for admins)'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $name: 'New project', $briefDescription: 'blablablabla', $description: '...', $origin: '...', $shortTermGoals: '...', $midTermGoals: '...', $longTermGoals: '...' }}

    // List of fields that can be updated
    const updatableFields = [
      'name',
      'briefDescription',
      'description',
      'origin',
      'shortTermGoals',
      'midTermGoals',
      'longTermGoals'
    ]

    // Fetch the original project data from the database
    const originalProject = await projectModel.findOne({ where: { id: req.params.pid } })

    // Check if the project exists
    if (!originalProject) {
      return res.status(404).json({ status: false, message: 'Project not found' })
    }

    const projectModified = {}

    // Loop through the fields and add to projectModified only if there's a change
    for (const field of updatableFields) {
      if (has(req.body, field) && req.body[field] !== originalProject[field]) {
        projectModified[field] = req.body[field]
      }
    }

    // Check if any fields are actually modified
    if (Object.keys(projectModified).length === 0) {
      return res.status(400).json({ status: false, message: 'No changes made to the project' })
    }

    // Update the project in the database with the modified fields
    await projectModel.update(projectModified, { where: { id: req.params.pid } })

    // Return a success message
    res.json({ status: true, message: 'Project updated' })
  },

  async deleteProject (req, res) {
    // #swagger.tags = ['Projects']
    // #swagger.summary = 'Delete a project (only for admins)'

    const project = await projectModel.findOne({ where: { id: req.params.pid } })
    await project.destroy()
    res.json({ status: true, message: 'Deleted project' })
  }
}
