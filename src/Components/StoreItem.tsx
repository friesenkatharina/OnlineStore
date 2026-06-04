import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();

  const quantity = getItemQuantity(id);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100 flex flex-col">
      <div className="aspect-square overflow-hidden bg-stone-50">
        <img
          src={imgUrl.trim()}
          alt={name.trim()}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4 gap-2">
          <h3 className="font-semibold text-gray-800 text-sm leading-snug">{name.trim()}</h3>
          <span className="text-sm font-bold whitespace-nowrap" style={{ color: "#14532d" }}>
            {formatCurrency(price)}
          </span>
        </div>
        <div className="mt-auto">
          {quantity === 0 ? (
            <button
              onClick={() => increaseCartQuantity(id)}
              className="w-full py-2 rounded-full text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: "#14532d" }}
            >
              In den Warenkorb
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between bg-stone-100 rounded-full px-2">
                <button
                  onClick={() => decreaseCartQuantity(id)}
                  className="w-8 h-8 flex items-center justify-center font-bold text-gray-700 hover:text-green-800 text-lg"
                >
                  −
                </button>
                <span className="text-sm font-semibold text-gray-800">{quantity}</span>
                <button
                  onClick={() => increaseCartQuantity(id)}
                  className="w-8 h-8 flex items-center justify-center font-bold text-gray-700 hover:text-green-800 text-lg"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(id)}
                className="w-full py-1.5 rounded-full text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition"
              >
                Entfernen
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
