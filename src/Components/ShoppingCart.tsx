import React from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import storeItems from "../items.json";
import { useMemo } from "react";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, cartItem) => {
      const item = storeItems.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);
  }, [cartItems]);

  const handleCheckout = () => {
    navigate("/checkoutform");
    closeCart();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <h2 className="font-black text-gray-900 uppercase tracking-wide text-sm">
            Warenkorb {cartItems.length > 0 && `(${cartItems.reduce((a, i) => a + i.quantity, 0)})`}
          </h2>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition text-gray-500 text-xl"
            aria-label="Schließen"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-2">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-10">
              <div className="text-5xl mb-4">🛒</div>
              <p className="text-sm font-semibold text-gray-700">Dein Warenkorb ist leer</p>
              <p className="text-xs text-gray-400 mt-1">Stöbere in unserem Store</p>
              <button
                onClick={closeCart}
                className="mt-4 text-xs font-bold underline"
                style={{ color: "#14532d" }}
              >
                Weiter shoppen
              </button>
            </div>
          ) : (
            cartItems.map((item) => <CartItem key={item.id} {...item} />)
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-5 py-5 border-t border-stone-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">Gesamt</span>
              <span className="text-lg font-black text-gray-900">{formatCurrency(totalPrice)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition"
            >
              Zur Kasse
            </button>
            <button
              onClick={closeCart}
              className="w-full py-2.5 mt-2 border border-stone-200 text-xs font-bold uppercase tracking-widest text-gray-600 hover:bg-stone-50 transition"
            >
              Weiter shoppen
            </button>
          </div>
        )}
      </div>
    </>
  );
}
