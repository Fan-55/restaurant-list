module.exports = {
  if_empty: function (a, options) {
    if (a.length === 0) {
      return options.fn(this)
    }
  }
}