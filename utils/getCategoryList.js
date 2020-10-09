function getCategoryList(restaurants) {
  const categories = []
  let categoryList = []

  for (const restaurant of restaurants) {
    categories.push(restaurant.category)
  }

  categoryList = new Set(categories)

  return categoryList
}

module.exports = getCategoryList