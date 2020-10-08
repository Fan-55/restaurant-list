module.exports = {
  if_empty: function (a, options) {
    if (a.length === 0) {
      return options.fn(this)
    }
  },
  if_exist: function (a, options) {
    if (a.length !== 0) {
      return options.fn(this)
    }
  },
  if_equal: function (a, b, options) {
    if (a === b) {
      return options.fn(this)
    }
  }
}