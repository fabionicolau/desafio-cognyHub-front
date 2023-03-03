import { useState, useEffect, useContext } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../database/firebaseConfig'
import getLocalStorage from '../../utils/getLocalStorage.js'
import CartContext from "../../context/context";
import './style.css'

function ProductsList() {
  const [products, setProducts] = useState([]);

  const { hasCartBeenChanged, setHasCartBeenChanged } = useContext(CartContext);
  
  useEffect(() => {
    const getProductsList = async () => {
      const collectionRef = collection(db, 'produtos');
      const data = await getDocs(collectionRef);
      setProducts(data.docs.map(doc => doc.data()))       
    }
    getProductsList()
  }, [])

  const checkIfTheProductAlreadyExistsInTheCart = (productId) => {
    const currentCart = getLocalStorage('cart')
    if (currentCart.length > 0) {
      const productAlreadyExists = currentCart.find((item) => item.id === productId)
      if (productAlreadyExists) {
        alert('O produto já está no carrinho')
        return false
      }
      return true
    }
    return true
  }

  const addProductToCart = (productID) => {
    if (!checkIfTheProductAlreadyExistsInTheCart(productID)) return false
    const currentCart = getLocalStorage('cart')

    const product = products.find((product) =>  product.id === productID)
    const addProduct = {
      id: product.id,
      imagem: product.imagem,
      preço: product.preço,
      descrição: product.descrição,
      quantidade: 1
    }

    if (currentCart.length > 0) {
      localStorage.setItem('cart', JSON.stringify([...currentCart, addProduct]))
    } else {
      localStorage.setItem('cart', JSON.stringify([addProduct]))
    }
    
    hasCartBeenChanged === true ? setHasCartBeenChanged(false) : setHasCartBeenChanged(true)
    
  }

  return (
    <div className='products-container'>
      {products.sort((a, b) => a.id - b.id).map((product) => 
        <div className='eachProduct' key={product.id}>
          <img src={product.imagem} alt="foto do calçado" />
          <p>{product.descrição}</p>
          <p className='teste'>{`R$ ${product.preço}`}</p>
         <button
          className='add-button'
          type='button'
          onClick={() => addProductToCart(product.id)}
         >
            Adicionar ao carrinho
         </button>
        </div>
      )}
    </div>
  )
}

export default ProductsList