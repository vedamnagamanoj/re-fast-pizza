"use client";

import { useCart } from "@/context/CartContext";
import Button from "../ui/Button";

function DeleteItem({ pizzaId }: { pizzaId: number }) {
  const { removeItem } = useCart();
  return (
    <Button type="small" onClick={() => removeItem(pizzaId)}>
      Delete
    </Button>
  );
}

export default DeleteItem;
