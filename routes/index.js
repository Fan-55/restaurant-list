const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const filter = require('./modules/filter')
const users = require('./modules/users')

router.use('/users', users)
router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', search)
router.use('/filter', filter)

module.exports = router