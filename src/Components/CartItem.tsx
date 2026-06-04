import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../items.json";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-stone-100">
      <img
        src={item.imgUrl.trim()}
        alt={item.name}
        className="w-20 h-16 object-cover rounded-lg flex-shrink-0 bg-stone-100"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{item.name.trim()}</p>
        <p className="text-xs text-gray-400">{formatCurrency(item.price)}</p>
        {quantity > 1 && (
          <p className="text-xs text-gray-400">x{quantity}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-gray-900">{formatCurrency(item.price * quantity)}</span>
        <button
          onClick={() => removeFromCart(id)}
          className="w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition text-lg leading-none"
          aria-label="Entfernen"
        >
          ×
        </button>
      </div>
    </div>
  );
}
