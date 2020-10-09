const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const getCategoryList = require('../../utils/getCategoryList')

router.get('/new', (req, res, next) => {
  res.render('new')
})

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
      next(error)
    })
})

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

router.get('/', (req, res, next) => {
  const queryString = req.query.sort
  const condition = req.query.sort.split(':')
  const filter = {}
  filter[condition[0]] = condition[1]
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