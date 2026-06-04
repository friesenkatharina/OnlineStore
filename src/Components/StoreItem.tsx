import React, { useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  subtitle?: string;
  price: number;
  imgUrl: string;
  isNew?: boolean;
  exclusive?: boolean;
};

export function StoreItem({ id, name, subtitle, price, imgUrl, isNew, exclusive }: StoreItemProps) {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
  const [wished, setWished] = useState(false);
  const quantity = getItemQuantity(id);

  return (
    <div className="group relative bg-white flex flex-col">

      {/* Bild-Container */}
      <div className="relative overflow-hidden bg-stone-100 aspect-[3/4]">
        <img
          src={imgUrl.trim()}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges oben links */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {exclusive && (
            <span className="text-[10px] font-bold px-2 py-0.5 bg-black text-white uppercase tracking-wider">
              Member Exclusive
            </span>
          )}
          {isNew && (
            <span className="text-[10px] font-bold px-2 py-0.5 bg-white text-black border border-black uppercase tracking-wider">
              Neu
            </span>
          )}
        </div>

        {/* Wishlist Herz oben rechts */}
        <button
          onClick={() => setWished(!wished)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition"
          aria-label="Zur Wunschliste"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill={wished ? "#14532d" : "none"}
            stroke={wished ? "#14532d" : "currentColor"}
            strokeWidth={1.8}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* In den Warenkorb — erscheint beim Hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {quantity === 0 ? (
            <button
              onClick={() => increaseCartQuantity(id)}
              className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition"
            >
              In den Warenkorb
            </button>
          ) : (
            <div className="flex bg-black">
              <button onClick={() => decreaseCartQuantity(id)} className="flex-1 py-3 text-white text-lg font-bold hover:bg-stone-800 transition">−</button>
              <span className="flex-1 py-3 text-white text-xs font-bold text-center flex items-center justify-center">{quantity} im Korb</span>
              <button onClick={() => increaseCartQuantity(id)} className="flex-1 py-3 text-white text-lg font-bold hover:bg-stone-800 transition">+</button>
            </div>
          )}
        </div>
      </div>

      {/* Produktinfos */}
      <div className="pt-3 pb-4">
        <h3 className="text-sm font-bold text-gray-900">{name}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        <p className="text-sm font-semibold text-gray-900 mt-1">{formatCurrency(price)}</p>
      </div>
    </div>
  );
}
