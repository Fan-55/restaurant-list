const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const getCategoryList = require('../../utils/getCategoryList')

router.get('/', (req, res, next) => {
  const targetCategory = req.query.category
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const categoryList = getCategoryList(restaurants)
      const targetRestaurants = restaurants.filter(restaurant => restaurant.category === targetCategory)
      res.render('search', { layout: 'withSearchBar', restaurants: targetRestaurants, categoryList })
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
})

module.exports = router