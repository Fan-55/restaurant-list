const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
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

app.use(express.static('public'))

//set routing
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      res.render('index', { restaurants })
    })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => {
      console.log(restaurant)
      res.render('detail', { restaurant })
    })
})

app.listen(port, () => {
  console.log(`This app is listening at http://localhost:${port}`)
})