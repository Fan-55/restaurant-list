const express = require('express')
const app = express()
const port = 3000


//set routing
app.get('/', (req, res) => {
  res.send('this is index')
})


app.listen(port, () => {
  console.log(`This app is listening at http://localhost:${port}`)
})