import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "../pages/cart";
import Products from "../pages/products"
import NotFound from "../pages/notFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to='/produtos' replace /> } />
        <Route path='/produtos' element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;