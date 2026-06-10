import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { StoreItem } from "../Components/StoreItem";
import storeItems from "../items.json";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Link } from "react-router-dom";

export function Store() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [filter, setFilter] = useState<"all" | "new" | "exclusive">("all");
  const { openCart, cartQuantity } = useShoppingCart();

  useEffect(() => {
    fetch("/api/users/me", { credentials: "include" })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => data && setUser(data.user))
      .catch(() => null);
  }, []);

  const filtered = storeItems.filter((item) => {
    if (filter === "new") return item.isNew;
    if (filter === "exclusive") return item.exclusive;
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Shop — Makramee Produkte online kaufen</title>
        <meta name="description" content="Alle Makramee-Produkte auf einen Blick: Wanddekos, Blumenampeln, Tischläufer und exklusive Stücke. Handgemacht aus natürlicher Baumwolle." />
        <link rel="canonical" href="https://makramee-store.vercel.app/store" />
      </Helmet>

      {/* Store Header */}
      <div className="border-b border-stone-100 py-10 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900">
          Unsere Kollektion
        </h1>
        <p className="text-gray-400 text-sm mt-2">{filtered.length} Stücke handgefertigt mit Liebe</p>

        {/* Filter */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {[
            { key: "all", label: "Alle" },
            { key: "new", label: "Neu" },
            { key: "exclusive", label: "Member Exclusive" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className={`text-xs font-bold uppercase tracking-widest px-4 py-2 border transition ${
                filter === f.key
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-stone-300 hover:border-black"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Member Exclusive Banner */}
      {filter === "exclusive" && !user && (
        <div className="bg-stone-900 text-white text-center py-4 px-4">
          <p className="text-sm">
            Diese Produkte sind exklusiv für Members.{" "}
            <Link to="/login" className="underline font-semibold hover:text-green-300">
              Jetzt anmelden
            </Link>{" "}
            oder{" "}
            <Link to="/signup" className="underline font-semibold hover:text-green-300">
              kostenlos registrieren
            </Link>
          </p>
        </div>
      )}

      {/* Warenkorb Button */}
      {cartQuantity > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={openCart}
            className="flex items-center gap-2 px-5 py-3 bg-black text-white text-sm font-bold uppercase tracking-wide shadow-xl hover:bg-stone-800 transition"
          >
            🛒 Warenkorb
            <span className="bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-black">
              {cartQuantity}
            </span>
          </button>
        </div>
      )}

      {/* Produkt Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {user && (
          <p className="text-sm text-gray-400 mb-6">
            Willkommen zurück, <span className="font-semibold text-gray-700">{user.username}</span> 👋
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {filtered.map((item) => (
            <StoreItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
