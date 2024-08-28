const router = require('express').Router()
router.use(require('./member'))
router.use(require('./project'))
router.use(require('./activity'))
module.exports = router
