const Restaurant = require('../restaurant')
const User = require('../user')
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')

db.once('open', () => {
  const USER_SEED = require('./data/user.json').users[0]
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(USER_SEED.password, salt))
    .then(hash => User.create({ name: USER_SEED.name, email: USER_SEED.email, password: hash }))
    .then(user => {
      const userId = user._id
      const RESTAURANT_SEED = require('./data/restaurant.json').results
      for (const restaurant of RESTAURANT_SEED) {
        restaurant.userId = userId
      }
      return Restaurant.insertMany(RESTAURANT_SEED)
    })
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(err => console.log(err))
})