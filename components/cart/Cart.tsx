"use client";

import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

function Cart() {
  const { username } = useUser();
  const { cart } = useCart();

  if (!cart.length) return <EmptyCart />;

  return (
    <>
      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b border-b-stone-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>
    </>
  );
}

export default Cart;
