// const projectModel = require('../models/projects.js')
const projectActivityModel = require('../models/projectActivity.js')
const activityModel = require('../models/activity.js')
const has = require('has-keys')
// const CodeError = require('../util/CodeError.js')

module.exports = {
  async getActivities (req, res) {
    // #swagger.tags = ['Activities']
    // #swagger.summary = 'List all activities'

    const projectId = parseInt(req.params.pid, 10)

    if (isNaN(projectId)) {
      return res.status(400).json({ status: false, message: 'Invalid project ID' })
    }

    const activities = await activityModel.findAll({
      attributes: ['id', 'name', 'briefDescription'],
      where: { projectId: projectId }
    })

    res.json({ status: true, message: 'Returning activities for project', activities })
  },

  async getActivity (req, res) {
    // #swagger.tags = ['Activities']
    // #swagger.summary = 'List informations from activity'

    const activityId = parseInt(req.params.aid, 10)
    const projectId = parseInt(req.params.pid, 10)

    if (isNaN(activityId) || isNaN(projectId)) {
      return res.status(400).json({
        status: false,
        message: 'Invalid activity ID or project ID',
        activity: []
      })
    }

    const activity = await activityModel.findOne({
      attributes: ['id', 'name', 'description', 'date', 'location', 'remainingPlaces', 'link', 'projectId'],
      where: {
        id: activityId,
        projectId: projectId
      }
    })

    if (!activity) {
      return res.json({
        status: false,
        message: 'No activity found with the given ID for the specified project',
        activity: []
      })
    }

    res.json({
      status: true,
      message: 'Returning information from activity',
      activity
    })
  },

  async newActivity (req, res) {
    // #swagger.tags = ['Activities']
    // #swagger.summary = 'Create a new activity (only for admins)'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $name: 'New activity', $briefDescription: 'blablablabla', $description: '...', $date:  '2024-03-30', $location: '...', $remainingPlaces: '...', $link: '...' }}

    const projectId = parseInt(req.params.pid, 10)
    if (isNaN(projectId)) {
      return res.status(400).json({ status: false, message: 'Invalid project ID' })
    }

    // Check if the activity name is missing in the request body
    if (!has(req.body, 'name')) {
      return res.status(400).json({ status: false, message: 'Missing activity name' })
    }

    // Create the new activity
    const newActivity = await activityModel.create({
      name: req.body.name,
      briefDescription: req.body.briefDescription,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      remainingPlaces: req.body.remainingPlaces,
      link: req.body.link,
      projectId: projectId
    })

    await projectActivityModel.create({ projectId: projectId, activityId: newActivity.id })

    // Return a success message
    res.json({ status: true, message: 'Created activity' })
  },

  async updateActivity (req, res) {
    // #swagger.tags = ['Activities']
    // #swagger.summary = 'Update an activity (only for admins)'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $name: 'New activity', $briefDescription: 'blablablabla', $description: '...', $date:  '2024-03-30', $location: '...', $remainingPlaces: '...', $link: '...' }}

    // List of fields that can be updated
    const updatableFields = ['id', 'name', 'briefDescription', 'description', 'date', 'location', 'remainingPlaces', 'link', 'projectId']

    // Fetch the original activity data from the database
    const originalActivity = await activityModel.findOne({ where: { id: req.params.aid } })

    // Check if the activity exists
    if (!originalActivity) {
      return res.status(404).json({ status: false, message: 'Activity not found' })
    }

    const activityModified = {}

    // Loop through the fields and add to activityModified only if there's a change
    for (const field of updatableFields) {
      if (has(req.body, field) && req.body[field] !== originalActivity[field]) {
        activityModified[field] = req.body[field]
      }
    }

    // Check if any fields are actually modified
    if (Object.keys(activityModified).length === 0) {
      return res.status(400).json({ status: false, message: 'No changes made to the activity' })
    }

    // Update the activity in the database with the modified fields
    await activityModel.update(activityModified, { where: { id: req.params.aid } })

    // Return a success message
    res.json({ status: true, message: 'Activity updated' })
  },

  async deleteActivity (req, res) {
    // #swagger.tags = ['Activities']
    // #swagger.summary = 'Delete an activity (only for admins)'

    const activity = await activityModel.findOne({ where: { id: req.params.aid } })
    await activity.destroy()

    res.json({ status: true, message: 'Deleted activity' })
  }
}
