const getLocalStorage = () => {
  const currentCart = JSON.parse(localStorage.getItem('cart'))
  if (currentCart) {
    return currentCart
  }
  return []
}

export default getLocalStorage