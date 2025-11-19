"use client";

import { useCart } from "@/context/CartContext";
import Button from "./Button";

function CartButtons() {
  const { clearCart, isCartEmpty } = useCart();

  const handleClearCart = clearCart;

  if (isCartEmpty) return null;

  return (
    <>
      <Button to="/order/new" type="primary">
        Order Pizzas
      </Button>
      <Button type="secondary" onClick={handleClearCart}>
        Clear Cart
      </Button>
    </>
  );
}

export default CartButtons;
