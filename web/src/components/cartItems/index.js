import { useState, useEffect, useContext } from "react";
import getLocalStorage from "../../utils/getLocalStorage";
import CartContext from "../../context/context";
import PropTypes from 'prop-types';

function CartItems({ product }) {
  const [inputAmount, setInputAmount] = useState(product.quantidade)
  const { setAmount } = useContext(CartContext)
  const { id } = product

  const subTotal = product.preço * inputAmount

  useEffect(() => {
    const currentCart = getLocalStorage("cart");
    const newCart = currentCart.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantidade: +inputAmount,
          subTotal,
        }
      }
      return product
    })
    localStorage.setItem("cart", JSON.stringify(newCart))
  }, [inputAmount, id, subTotal])

  return (
    <div key={product.id}>
      <img src={product.imagem} alt="foto do calçado" width='250px' height='250px' />
      <p>{product.descrição}</p>
      <input 
      type="number" 
      min='1'
      value={inputAmount}
      onChange={(event) => {
        setInputAmount(event.target.value)
        setAmount(event.target.value)
      }}  
      />
      <p>{subTotal.toFixed(2).replace('.', ',')}</p>
    </div>
  )
}

CartItems.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    imagem: PropTypes.string,
    descrição: PropTypes.string,
    preço: PropTypes.number,
    quantidade: PropTypes.number,
    subTotal: PropTypes.number,
  }).isRequired,
}

export default CartItems