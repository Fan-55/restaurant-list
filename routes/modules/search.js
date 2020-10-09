const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const getCategoryList = require('../../utils/getCategoryList')

router.get('/', (req, res, next) => {
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const categoryList = getCategoryList(restaurants)
      const keyword = req.query.keyword.trim()
      const targetRestaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))

      res.render('search', { layout: 'withSearchBar', restaurants: targetRestaurants, keyword, categoryList })
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
})

module.exports = router