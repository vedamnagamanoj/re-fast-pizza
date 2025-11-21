"use client";

import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/helpers";
import { ShoppingCart, X, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function CartOverview() {
  const { cart, clearCart, getTotalPizzaQuantity, getTotalPizzaCost, removeItem } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);

  const quantity = getTotalPizzaQuantity();
  const amount = getTotalPizzaCost();

  if (quantity === 0) return null;

  return (
    <div className="fixed bottom-20 right-6 z-50 flex flex-col items-end gap-2">
      {/* Expanded Cart Items List */}
      {isExpanded && (
        <div className="bg-white rounded-lg shadow-2xl border-2 border-yellow-600 w-80 max-h-96 overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-yellow-600 p-3 flex items-center justify-between">
            <h3 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Cart Items ({quantity})
            </h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-stone-900 hover:text-stone-700 transition-colors"
              aria-label="Collapse cart"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items - Max 5 visible with scroll */}
          <div className="max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-3 border-b border-stone-200 hover:bg-stone-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-stone-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-stone-600 mt-1">
                      {item.quantity} × {formatCurrency(item.unitPrice)} = {formatCurrency(item.totalPrice)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700 transition-colors flex-shrink-0"
                    aria-label={`Remove ${item.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-2">
            <button
              onClick={clearCart}
              className="text-xs text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
            >
              <Trash2 className="h-3 w-3" />
              Clear All
            </button>
            <Link
              href="/cart"
              className="bg-yellow-600 text-stone-900 px-4 py-1.5 rounded-md text-xs font-semibold hover:bg-yellow-700 transition-colors"
            >
              View Cart →
            </Link>
          </div>
        </div>
      )}

      {/* Snackbar Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-yellow-600 text-stone-900 px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-3 border-2 border-yellow-700 group"
        aria-label={isExpanded ? "Collapse cart" : "Expand cart"}
      >
        <ShoppingCart className="h-5 w-5" />
        <div className="flex items-center gap-3">
          <div className="text-left">
            <p className="text-xs font-medium leading-none">
              {quantity} {quantity === 1 ? "item" : "items"}
            </p>
            <p className="text-sm font-bold leading-none mt-1">
              {formatCurrency(amount)}
            </p>
          </div>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
          ) : (
            <ChevronUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
          )}
        </div>
      </button>
    </div>
  );
}

export default CartOverview;
