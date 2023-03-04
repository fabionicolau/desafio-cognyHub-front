const getLocalStorage = (item) => {
  const currentCart = JSON.parse(localStorage.getItem(item))
  if (currentCart) {
    return currentCart
  }
  return []
}

export default getLocalStorage