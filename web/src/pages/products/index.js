import Header from "../../components/header";
import ProductsList from "../../components/productsList";
import CartProvider from "../../context/provider";

function Products() {
  return (
    <div>
      <CartProvider>
      <Header />
      <ProductsList />
      </CartProvider>
    </div>
  );  
}

export default Products;