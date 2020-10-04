const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
const Handlebars = require('handlebars')
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

//set routing
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      res.render('index', { restaurants })
    })
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
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

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants/', (req, res) => {
  const addedItems = req.body
  Restaurant.create({
    name: addedItems.name,
    name_en: addedItems.name_en,
    category: addedItems.category,
    image: addedItems.image,
    location: addedItems.location,
    phone: addedItems.phone,
    google_map: addedItems.google_map,
    rating: addedItems.rating,
    description: addedItems.description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => {
      res.render('detail', { restaurant })
    })
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const editedItems = req.body
  Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = editedItems.name
      restaurant.category = editedItems.category
      restaurant.location = editedItems.location
      restaurant.google_map = editedItems.google_map
      restaurant.phone = editedItems.phone
      restaurant.description = editedItems.description
      restaurant.image = editedItems.image
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`This app is listening at http://localhost:${port}`)
})

Handlebars.registerHelper("if_empty", (a, options) => {
  if (a.length === 0) {
    return options.fn(this)
  }
})