import Header from "../../components/header";
import CartList from "../../components/cartList";
import CartProvider from "../../context/provider";

function Cart() {
  return (
    <CartProvider>
      <Header />
      <CartList />
    </CartProvider>
  );  
}

export default Cart;