const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const filter = require('./modules/filter')

router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', search)
router.use('/filter', filter)

module.exports = router