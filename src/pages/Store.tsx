import React, { useEffect, useState } from "react";
import { StoreItem } from "../Components/StoreItem";
import storeItems from "../items.json";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Store() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const { openCart, cartQuantity } = useShoppingCart();

  useEffect(() => {
    fetch("/api/users/me", { credentials: "include" })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => data && setUser(data.user))
      .catch(() => null);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {user ? `Willkommen, ${user.username}!` : "Unser Shop"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {storeItems.length} handgefertigte Stücke
          </p>
        </div>
        {cartQuantity > 0 && (
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold text-sm shadow hover:opacity-90 transition"
            style={{ backgroundColor: "#14532d" }}
          >
            🛒 Warenkorb
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cartQuantity}
            </span>
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {storeItems.map((item) => (
          <StoreItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
