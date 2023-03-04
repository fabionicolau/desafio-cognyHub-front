import { useContext, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../database/firebaseConfig";
import getLocalStorage from "../../utils/getLocalStorage";
import CartItems from "../../components/cartItems";
import CartContext from "../../context/context";
import './style.css'

function CartList() {
  const { total, amount, setTotal,
     isFinished, setIsFinished } = useContext(CartContext);
  const currentCart = getLocalStorage("cart");

  useEffect(() => {
    const currentCart = getLocalStorage("cart");
    const total = currentCart.reduce((acc, product) => {
      return acc + product.subTotal;
    }
    , 0);
    setTotal(total);
  }, [setTotal, amount, isFinished]);


  const addToDataBase = async () => {
    const currentCart = getLocalStorage("cart");
    const idList = currentCart.map(({ id }) => id)
    const collectionRef = collection(db, 'vendas');
    await addDoc(collectionRef, { idList, total });
  }

  const checkout = async () => {
    await addToDataBase();
    localStorage.clear();
    setIsFinished(true);
    alert('Compra finalizada com sucesso!')
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