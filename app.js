const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const routes = require('./routes/index')
const port = 3000

require('./config/mongoose')

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: require('./utils/hbsHelpers')
}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`This app is listening at http://localhost:${port}`)
})