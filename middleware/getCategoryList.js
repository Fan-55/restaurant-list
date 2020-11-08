function getCategoryList(restaurants) {
  const categories = []
  for (const restaurant of restaurants) {
    categories.push(restaurant.category)
  }
  return new Set(categories)
}

module.exports = async (req, res, next) => {
  const userId = req.user._id
  const Restaurant = require('../models/restaurant')
  const restaurants = await Restaurant.find({ userId }).lean()
  res.locals.categoryList = getCategoryList(restaurants)
  next()
}