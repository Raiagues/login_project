const router = require('express').Router()
router.use(require('./member'))
router.use(require('./project'))
module.exports = router
