const dataPanel = document.querySelector('.row')

dataPanel.addEventListener('click', (e) => {
  if (e.target.matches('.delete')) {
    const user_confirmation = confirm('Are you sure you want to delete this item?')
    if (!user_confirmation) return e.preventDefault();
    return alert('This item is deleted!')
  }
})