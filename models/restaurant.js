const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stringAttribute = {
  type: String,
  required: true
}

const numberAttribute = {
  type: Number,
  required: true
}

const restaurantSchema = new Schema({
  name: stringAttribute,
  name_en: stringAttribute,
  category: stringAttribute,
  image: stringAttribute,
  location: stringAttribute,
  phone: stringAttribute,
  google_map: stringAttribute,
  rating: numberAttribute,
  description: stringAttribute
})

module.exports = mongoose.model('Restaurant', restaurantSchema)