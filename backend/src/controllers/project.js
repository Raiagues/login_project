const projectModel = require('../models/projects.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')

module.exports = {
  async getProjects (req, res) {
    // #swagger.tags = ['Projects']
    // #swagger.summary = 'Lister toutes les communautes'
    const communities = await projectModel.findAll({ attributes: ['id', 'name', 'imgPath', 'ownerId'] })
    res.json({ status: true, message: 'Returning all communities', communities })
  },

  async newProject (req, res) {
    // #swagger.tags = ['Projects']
    // #swagger.summary = 'Créer une communaute'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $name: 'New community', $imgPath: 'https://i.redd.it/e7nrih7kk8431.jpg' }}

    // Vérifier si le nom de la communauté est manquant ou si la communauté existe déjà
    if (!has(req.body, 'name')) {
      throw new CodeError('Missing community name', 400)
    }
    const communityExists = await projectModel.findOne({ attributes: ['name'], where: { name: req.body.name } })
    if (communityExists != null) {
      throw new CodeError('This community already exists', 400)
    }
    // Créer la communauté avec les paramètres de la demande
    await projectModel.create({ name: req.body.name, imgPath: req.body.imgPath, ownerId: req.user.id })

    // Renvoie un message de création réussie
    res.json({ status: true, message: 'Created project' })
  },

  async updateProject (req, res) {
    // #swagger.tags = ['Projects']
    // #swagger.summary = 'Sortir d'une communaute'
  },

  async deleteProject (req, res) {
    // #swagger.tags = ['Projects']
    // #swagger.summary = 'Sortir d'une communaute'

    // await userCommunityModel.destroy({ where: { memberId: req.user.id, commId: req.params.cid } })
    // res.json({ status: true, message: 'User left the community' })
  }
}
