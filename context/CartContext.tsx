"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { CartItem } from "@/types";

type CartState = {
  cart: CartItem[];

  addItem: (newItem: CartItem) => void;
  removeItem: (id: number) => void;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  clearCart: () => void;
  getCurrentQuantityById: (id: number) => number;
  getTotalPizzaQuantity: () => number;
  getTotalPizzaCost: () => number;
  isCartEmpty: boolean;
};

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, isInitialized]);

  const addItem = (newItem: CartItem) => {
    setCart((prev) => [newItem, ...prev]);
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseItemQuantity = (id: number) => {
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

  const decreaseItemQuantity = (id: number) => {
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

  const getCurrentQuantityById = (id: number) =>
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
