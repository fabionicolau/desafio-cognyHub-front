import { useState, useMemo } from "react";

import CartContext from "./context";

function CartProvider({ children }) {
  const [amount, setAmount] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasCartBeenChanged, setHasCartBeenChanged] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const value = useMemo(() => ({
    amount, 
    total,
    hasCartBeenChanged,
    isFinished,
    setAmount,
    setTotal,
    setHasCartBeenChanged,
    setIsFinished,
    }), [amount, hasCartBeenChanged, isFinished, total]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
