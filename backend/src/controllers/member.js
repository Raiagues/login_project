const status = require('http-status')
const memberModel = require('../models/members.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')
const bcrypt = require('bcrypt')
const jws = require('jws')
require('mandatoryenv').load(['TOKENSECRET'])
const { TOKENSECRET } = process.env

function validPassword (password) {
  return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password)
}

module.exports = {
  async login (req, res) {
    // #swagger.tags = ['Members']
    // #swagger.summary = 'Verify credentials of member using email and password and return token'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $email: 'user_test_1@gmail.com', $password: '123456'}}

    if (!has(req.body, ['email', 'password'])) throw new CodeError('You must specify the email and password', status.BAD_REQUEST)
    const { email, password } = req.body
    const member = await memberModel.findOne({ where: { email } })
    if (member) {
      if (await bcrypt.compare(password, member.passhash)) {
        const token = jws.sign({ header: { alg: 'HS256' }, payload: email, secret: TOKENSECRET })
        res.json({ status: true, message: 'Login/Password ok', token })
        return
      }
    }
    res.status(status.FORBIDDEN).json({ status: false, message: 'Wrong email/password' })
  },

  async newMember (req, res) {
    // #swagger.tags = ['Members']
    // #swagger.summary = 'New member'
    // #swagger.parameters['obj'] = { in: 'body', description:'Name and email', schema: { $name: 'New Member', $email: 'new_member@example.com', $password: '1m02P@SsF0rt!'}}

    if (!has(req.body, ['name', 'email', 'password'])) throw new CodeError('You must specify the name and email', status.BAD_REQUEST)
    const { name, email, password } = req.body
    console.log(req.body)
    if (!validPassword(password)) throw new CodeError('Weak password!', status.BAD_REQUEST)
    await memberModel.create({ name, email, passhash: await bcrypt.hash(password, 2) })
    res.json({ status: true, message: 'Member Added' })
  },

  async getMembers (req, res) {
    // #swagger.tags = ['Members']
    // #swagger.summary = 'Get all members names and emails'

    const data = await memberModel.findAll({ attributes: ['id', 'name', 'email'] })
    res.json({ status: true, message: 'Returning members', data })
  },

  async getMembersInfo (req, res) {
    // #swagger.tags = ['Members']
    // #swagger.summary = 'Get all members informations'

    const data = await memberModel.findAll({ attributes: ['id', 'name', 'email', 'position', 'description', 'yearJoined', 'imgPath', 'linkedinLink', 'cvLink', 'lattesLink', 'githubLink'] })
    res.json({ status: true, message: 'Returning members', data })
  },

  async updateMember (req, res) {
    // #swagger.tags = ['Members']
    // #swagger.summary = 'Mettre à jour les informations de l utilisateur (réservé à un utilisateur administrateur)'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $name: 'John Doe', $email: 'John.Doe@acme.com', $password: '1m02P@SsF0rt!' }}

    const memberModified = {}
    for (const field of ['name', 'email', 'password']) {
      if (has(req.body, field)) {
        if (field === 'password') {
          memberModified.passhash = await bcrypt.hash(req.body.password, 2)
        } else {
          memberModified[field] = req.body[field]
        }
      }
    }
    if (Object.keys(memberModified).length === 0) throw new CodeError('You must specify the name, email or password', status.BAD_REQUEST)
    await memberModel.update(memberModified, { where: { id: req.params.id } })
    res.json({ status: true, message: 'Member updated' })
  },

  async deleteMember (req, res) {
    // #swagger.tags = ['Members']
    // #swagger.summary = 'Delete member'

    if (!has(req.params, 'id')) throw new CodeError('You must specify the id', status.BAD_REQUEST)
    const { id } = req.params
    await memberModel.destroy({ where: { id } })
    res.json({ status: true, message: 'Member deleted' })
  }
}
