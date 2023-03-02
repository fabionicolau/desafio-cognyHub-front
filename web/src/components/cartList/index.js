import { useContext, useEffect, useState } from "react";
import getLocalStorage from "../../utils/getLocalStorage";
import CartItems from "../../components/cartItems";
import CartContext from "../../context/context";

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
    <div>
      <section>
        {currentCart.length > 0 ? (
          currentCart.map((product) => {
            return (
              <div key={product.id}>
                <CartItems product={product} />
              </div>
            );
          })
        ) : <p>Carrinho vazio</p>}
      </section>
      <section>
        <button 
          type="button"
          onClick={checkout}
        >
          Finalizar Pedido
        </button>
        <p>Total: {total.toFixed(2).replace('.', ',')}</p>
      </section>
    </div>
  );
}

export default CartList;