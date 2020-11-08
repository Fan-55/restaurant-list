const Restaurant = require('../restaurant')
const User = require('../user')
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')

db.once('open', async () => {
  try {
    //create 2 seed users
    const USERS_SEED = require('./data/user.json').users
    for (const USER of USERS_SEED) {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(USER.password, salt)
      USER.password = hash
    }
    const users = await User.insertMany(USERS_SEED)

    //create restaurant list for each user
    const RESTAURANTS_SEED = require('./data/restaurant.json').restaurants
    for (const RESTAURANT of RESTAURANTS_SEED) {
      if (RESTAURANT.id <= 3) {
        RESTAURANT.userId = users[0]._id
      }
      if (RESTAURANT.id > 3 && RESTAURANT.id <= 6) {
        RESTAURANT.userId = users[1]._id
      }
    }
    const restaurants = RESTAURANTS_SEED.slice(0, 6)
    await Restaurant.insertMany(restaurants)

    //exit process
    console.log('Seeds created!')
    process.exit()
  } catch (err) {
    console.log(err)
    process.exit()
  }
})