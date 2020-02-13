const express = require('express')
const router = express.Router()


router.use('/user',require('../Model/users/usersRoutes'))
router.use('/event',require('../Model/events/eventsRoutes'))

module.exports = router
