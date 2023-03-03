import { useContext, useEffect, useState } from "react";
import getLocalStorage from "../../utils/getLocalStorage";
import CartItems from "../../components/cartItems";
import CartContext from "../../context/context";
import './style.css'

function CartList() {
  const [isFinished, setIsFinished] = useState(false);
  const { total, amount, setTotal } = useContext(CartContext);
  const currentCart = getLocalStorage("cart");

  useEffect(() => {
    const currentCart = getLocalStorage("cart");
    const total = currentCart.reduce((acc, product) => {
      return acc + product.subTotal;
    }
    , 0);
    setTotal(total);
  }, [setTotal, amount, isFinished]);


  const checkout = () => {
    // const finalCart = getLocalStorage("cart");
    localStorage.clear();
    setIsFinished(true);
    alert('Compra finalizada com sucesso!')
    // logica para salvar no firebase
  }

  return (
    <div className="cart-container">
      {currentCart.length > 0 ? (
        <table className="table-container">
          <thead>
            <tr>
              <th></th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {currentCart.map((product) => {
              return (
                  <CartItems key={product.id} product={product} />
              );
            })}
          </tbody>
        </table>
            ) : <p className="empty-cart">Carrinho vazio</p>}
      <section className="checkout-container">
        <button 
          type="button"
          onClick={checkout}
        >
          Finalizar Pedido
        </button>
        <p><span>Total:</span>{`R$ ${total.toFixed(2).replace('.', ',')}`}</p>
      </section>
    </div>
  );
}

export default CartList;