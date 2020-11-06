const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const getCategoryList = require('../../utils/getCategoryList')

//get the restaurant creation page
router.get('/new', (req, res, next) => {
  res.render('new')
})

//Create a new restaurant to the list
router.post('/', (req, res, next) => {
  const restaurant = Object.assign({}, req.body)
  restaurant.userId = req.user._id
  Restaurant
    .create(restaurant)
    .then(() => res.redirect('/'))
    .catch(err => next(err))
})

//Read the detail page of chosen restaurant
router.get('/:id', (req, res, next) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant
    .findOne({ _id, userId })
    .lean()
    .then(restaurant => {
      if (!restaurant) {
        const err = new Error('This restaurant does not exist.')
        err.status = 404
        return next(err)
      }
      res.render('detail', { restaurant })
    })
    .catch(err => next(err))
})

//Read the edit page of chosen restaurant
router.get('/:id/edit', (req, res, next) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant
    .findOne({ _id, userId })
    .lean()
    .then(restaurant => {
      if (!restaurant) {
        const err = new Error('This restaurant does not exist.')
        err.status = 404
        return next(err)
      }
      res.render('edit', { restaurant })
    })
    .catch(err => next(err))
})

//Update the chosen restaurant
router.put('/:id', (req, res, next) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant
    .findOne({ _id, userId })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => next(err))
})

//Delete the chosen restaurant
router.delete('/:id', (req, res, next) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant
    .findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => next(err))
})

//Route for sorting function
router.get('/', (req, res, next) => {
  const queryString = req.query.sort
  const [target, method] = req.query.sort.split(':')
  const filter = {}
  filter[target] = method
  Restaurant.find()
    .lean()
    .sort(filter)
    .then((restaurants) => {
      const categoryList = getCategoryList(restaurants)
      res.render('index', { layout: 'withSearchBar', restaurants, queryString, categoryList })
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
})

module.exports = router