const searchBtn = document.querySelector('#search-button')

searchBtn.addEventListener('click', e => {
  const searchInput = document.querySelector('#search-input')
  const keyword = searchInput.value.trim()
  if (keyword.length === 0) {
    searchInput.value = null
    return e.preventDefault()
  }
})