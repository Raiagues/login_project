const status = require('http-status')
const userModel = require('../models/users.js')
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
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Verify credentials of user using email and password and return token'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $email: 'John.Doe@acme.com', $password: '12345'}}
    if (!has(req.body, ['email', 'password'])) throw new CodeError('You must specify the email and password', status.BAD_REQUEST)
    const { email, password } = req.body
    const user = await userModel.findOne({ where: { email } })
    if (user) {
      if (await bcrypt.compare(password, user.passhash)) {
        const token = jws.sign({ header: { alg: 'HS256' }, payload: email, secret: TOKENSECRET })
        res.json({ status: true, message: 'Login/Password ok', token })
        return
      }
    }
    res.status(status.FORBIDDEN).json({ status: false, message: 'Wrong email/password' })
  },
  async newUser (req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'New User'
    // #swagger.parameters['obj'] = { in: 'body', description:'Name and email', schema: { $name: 'John Doe', $email: 'John.Doe@acme.com', $password: '1m02P@SsF0rt!'}}
    if (!has(req.body, ['name', 'email', 'password'])) throw new CodeError('You must specify the name and email', status.BAD_REQUEST)
    const { name, email, password } = req.body
    console.log(req.body)
    if (!validPassword(password)) throw new CodeError('Weak password!', status.BAD_REQUEST)
    await userModel.create({ name, email, passhash: await bcrypt.hash(password, 2) })
    res.json({ status: true, message: 'User Added' })
  },
  async getUsers (req, res) {
    // TODO : verify if the token is valid...
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get All users'
    const data = await userModel.findAll({ attributes: ['id', 'name', 'email'] })
    res.json({ status: true, message: 'Returning users', data })
  },
  async updateUser (req, res) {
    // TODO : verify if the token is valid and correspond to an admin
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Mettre à jour les informations de l utilisateur (réservé à un utilisateur administrateur)'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $name: 'John Doe', $email: 'John.Doe@acme.com', $password: '1m02P@SsF0rt!' }}
    const userModified = {}
    for (const field of ['name', 'email', 'password']) {
      if (has(req.body, field)) {
        if (field === 'password') {
          userModified.passhash = await bcrypt.hash(req.body.password, 2)
        } else {
          userModified[field] = req.body[field]
        }
      }
    }
    if (Object.keys(userModified).length === 0) throw new CodeError('You must specify the name, email or password', status.BAD_REQUEST)
    await userModel.update(userModified, { where: { id: req.params.id } })
    res.json({ status: true, message: 'User updated' })
  },
  async deleteUser (req, res) {
    // TODO : verify if the token is valid and correspond to an admin
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete User'
    if (!has(req.params, 'id')) throw new CodeError('You must specify the id', status.BAD_REQUEST)
    const { id } = req.params
    await userModel.destroy({ where: { id } })
    res.json({ status: true, message: 'User deleted' })
  }
}
