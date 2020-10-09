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
  Restaurant.create({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  })
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      next(error)
    })
})

//Read the detail page of chosen restaurant
router.get('/:id', (req, res, next) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => {
      if (restaurant === null) {
        const error = new Error('This restaurant does not exist!')
        error.status = 404
        return next(error)
      }
      res.render('detail', { restaurant })
    })
    .catch(error => {
      console.log(error)
      error.message = 'Incorrect _id type'
      next(error)
    })
})

//Read the edit page of chosen restaurant
router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      if (restaurant === null) {
        const error = new Error('This restaurant does not exist!')
        error.status = 404
        return next(error)
      }
      res.render('edit', { restaurant })
    })
    .catch(error => {
      console.log(error)
      error.message = 'Incorrect _id type'
      next(error)
    })
})

//Update the chosen restaurant
router.put('/:id', (req, res, next) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then((restaurant) => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => {
      console.log(error)
      next(error)
    })
})

//Delete the chosen restaurant
router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      next(error)
    })
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