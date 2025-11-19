"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

type CartState = {
  cart: CartItem[];

  addItem: (newItem: CartItem) => void;
  removeItem: (id: string) => void;
  increaseItemQuantity: (id: string) => void;
  decreaseItemQuantity: (id: string) => void;
  clearCart: () => void;
  getCurrentQuantityById: (id: string) => number;
  getTotalPizzaQuantity: () => number;
  getTotalPizzaCost: () => number;
  isCartEmpty: boolean;
};

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];

    const saved = localStorage.getItem("cart");

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (newItem: CartItem) => {
    setCart((prev) => [newItem, ...prev]);
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseItemQuantity = (id: string) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id)
          return {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: (item.quantity + 1) * item.unitPrice,
          };
        else return item;
      })
    );
  };

  const decreaseItemQuantity = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: (item.quantity - 1) * item.unitPrice,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCurrentQuantityById = (id: string) =>
    cart.reduce((res, item) => (item.id === id ? item.quantity : res), 0);

  const getTotalPizzaQuantity = () =>
    cart.reduce((res, item) => res + item.quantity, 0);

  const getTotalPizzaCost = () =>
    cart.reduce((res, item) => res + item.totalPrice, 0);

  const isCartEmpty = cart.length === 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        increaseItemQuantity,
        decreaseItemQuantity,
        clearCart,
        getCurrentQuantityById,
        getTotalPizzaQuantity,
        getTotalPizzaCost,
        isCartEmpty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context)
    throw new Error("Cart context cannot be used outside its provider");

  return context;
}
