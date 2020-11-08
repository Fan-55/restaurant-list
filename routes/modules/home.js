const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res, next) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then((restaurants) => {
      res.render('index', { layout: 'withSearchBar', restaurants })
    })
    .catch(err => next(err))
})

module.exports = router