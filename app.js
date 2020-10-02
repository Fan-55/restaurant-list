const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

//set routing
app.get('/', (req, res) => {
  res.send('this is index')
})

app.listen(port, () => {
  console.log(`This app is listening at http://localhost:${port}`)
})