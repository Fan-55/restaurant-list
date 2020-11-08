const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')
const getCategoryList = require('../middleware/getCategoryList')

router.use('/users', users)
router.use('/auth', auth)
router.use('/restaurants', authenticator, getCategoryList, restaurants)
router.use('/', authenticator, getCategoryList, home)

module.exports = router