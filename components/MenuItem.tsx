"use client";

import { formatCurrency } from "@/utils/helpers";
import Image from "next/image";
import Button from "./Button";
import UpdateItemQuantity from "./UpdateItemQuantity";
import DeleteItem from "./DeleteItem";
import { useCart } from "@/context/CartContext";

type PizzaType = {
  id: string;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
};

function MenuItem({ pizza }: { pizza: PizzaType }) {
  // const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const { id, name, unitPrice, ingredients, imageUrl, soldOut } = pizza;
  const { getCurrentQuantityById, addItem } = useCart();

  const currentQuantity = getCurrentQuantityById(id);

  const isInCart = currentQuantity > 0;

  const handleAddToCart = () => {
    const newItem = {
      id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    addItem(newItem);
  };
  return (
    <li className="flex gap-4 py-2">
      <div className="relative h-24 w-24">
        <Image
          src={imageUrl}
          alt={`${name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover ${soldOut ? "opacity-70 grayscale" : ""}`}
        />
      </div>

      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm font-medium text-stone-700">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold Out
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
