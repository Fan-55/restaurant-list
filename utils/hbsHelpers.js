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
  },
  if_oneIsTrue: function (con1, con2, options) {
    if (con1 || con2) {
      return options.fn(this)
    }
  },
  if_allTrue: function (con1, con2, options) {
    if (con1 && con2) {
      return options.fn(this)
    } else {
      return options.inverse(this)
    }
  }
}