const memberModel = require('../models/members.js')
const CodeError = require('../util/CodeError.js')
const jws = require('jws')
require('mandatoryenv').load(['TOKENSECRET'])
const { TOKENSECRET } = process.env

module.exports = {
  // Check if the user is an administrator
  async isAdmin (req, res, next) {
    if (req.user.isAdmin === false) {
      throw new CodeError('Forbidden - not admin', 403)
    }
    next()
  },

  // Check for the presence and validity of the access token
  async verifyTokenPresent (req, res, next) {
    // #swagger.security = [{"apiKeyAuth": []}]
    // Check if the access token is present in the request headers
    if (!req.headers || !Object.prototype.hasOwnProperty.call(req.headers, 'x-access-token')) {
      throw new CodeError('Token missing', 403)
    }
    // Verify the validity of the access token
    if (!jws.verify(req.headers['x-access-token'], 'HS256', TOKENSECRET)) {
      throw new CodeError('Token invalid', 403)
    }
    // Decode the access token to get the user's email
    req.email = jws.decode(req.headers['x-access-token']).payload
    // Check if the user associated with the access token is present in the database
    req.user = await memberModel.findOne({
      attributes: ['id', 'name', 'email', 'passhash', 'isAdmin'],
      where: { email: req.email }
    })
    if (req.user == null) {
      throw new CodeError('Unknown user', 403)
    }
    next()
  }
}
