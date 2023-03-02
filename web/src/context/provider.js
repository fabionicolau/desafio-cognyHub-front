import { useState, useMemo } from "react";

import CartContext from "./context";

function CartProvider({ children }) {
  const [amount, setAmount] = useState(1);
  const [total, setTotal] = useState(0);

  const value = useMemo(() => ({
    amount, 
    total,
    setAmount,
    setTotal,
    }), [amount, total]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
