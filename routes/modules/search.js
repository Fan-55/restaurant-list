const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  console.log(req.originalUrl)
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const keyword = req.query.keyword.trim()
      if (keyword.length === 0) {
        return res.redirect('/')
      }
      let targetRestaurants = []
      targetRestaurants = targetRestaurants.concat(restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase())))

      targetRestaurants = targetRestaurants.concat(restaurants.filter(restaurant => restaurant.category.toLowerCase().includes(keyword.toLowerCase())))

      res.render('search', { restaurants: targetRestaurants, keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router