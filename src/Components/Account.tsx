import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../items.json";

type UserInfo = { username: string; email: string };

const recentOrders = [
  { id: "#ORD-001", date: "02.06.2026", item: "WandbehangStar", price: 59.9, status: "Geliefert" },
  { id: "#ORD-002", date: "28.05.2026", item: "BluetenEleganz", price: 39.9, status: "Geliefert" },
];

export default function AccountPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { cartItems, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartQuantity } = useShoppingCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/users/me", { credentials: "include" })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => { if (data) setUser(data.user); else navigate("/login"); })
      .catch(() => navigate("/login"))
      .finally(() => setLoading(false));
  }, []);

  const cartTotal = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderLeft: "5px solid #14532d" }}>
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Mein Konto</p>
            <h1 className="text-2xl font-bold text-gray-900">
              Hallo, {user?.username}! 👋
            </h1>
            <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
          </div>
          <Link
            to="/store"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition"
            style={{ backgroundColor: "#14532d" }}
          >
            🛍️ Weiter shoppen
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Artikel im Warenkorb", value: cartQuantity, icon: "🛒" },
            { label: "Warenkorbwert", value: formatCurrency(cartTotal), icon: "💶" },
            { label: "Bestellungen", value: recentOrders.length, icon: "📦" },
            { label: "Mitglied seit", value: "2026", icon: "🌿" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Warenkorb */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900 text-lg">🛒 Mein Warenkorb</h2>
              {cartItems.length > 0 && (
                <Link to="/checkoutform" className="text-xs font-semibold px-4 py-1.5 rounded-full text-white" style={{ backgroundColor: "#14532d" }}>
                  Zur Kasse
                </Link>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <div className="text-4xl mb-3">🛒</div>
                <p className="text-sm">Dein Warenkorb ist leer.</p>
                <Link to="/store" className="text-sm font-semibold hover:underline mt-2 inline-block" style={{ color: "#14532d" }}>
                  Jetzt stöbern →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((cartItem) => {
                  const item = storeItems.find((i) => i.id === cartItem.id);
                  if (!item) return null;
                  return (
                    <div key={cartItem.id} className="flex items-center gap-3 p-3 rounded-xl bg-stone-50">
                      <img src={item.imgUrl.trim()} alt={item.name} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{item.name.trim()}</p>
                        <p className="text-xs text-gray-400">{formatCurrency(item.price)} / Stück</p>
                      </div>
                      <div className="flex items-center gap-1 bg-white rounded-full px-2 py-1 border border-stone-200">
                        <button onClick={() => decreaseCartQuantity(cartItem.id)} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-green-800 font-bold">−</button>
                        <span className="text-sm font-semibold w-4 text-center">{cartItem.quantity}</span>
                        <button onClick={() => increaseCartQuantity(cartItem.id)} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-green-800 font-bold">+</button>
                      </div>
                      <button onClick={() => removeFromCart(cartItem.id)} className="text-red-400 hover:text-red-600 text-lg">×</button>
                    </div>
                  );
                })}
                <div className="flex justify-between items-center pt-3 border-t border-stone-100 font-bold text-gray-900">
                  <span>Gesamt</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Letzte Bestellungen */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 text-lg mb-5">📦 Letzte Bestellungen</h2>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-stone-50">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{order.item}</p>
                    <p className="text-xs text-gray-400">{order.id} · {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800">{formatCurrency(order.price)}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Empfehlungen */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-900 text-lg mb-5">✨ Das könnte dir gefallen</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {storeItems.slice(0, 4).map((item) => (
              <Link to="/store" key={item.id} className="group block">
                <div className="aspect-square overflow-hidden rounded-2xl bg-stone-100 mb-2">
                  <img
                    src={item.imgUrl.trim()}
                    alt={item.name.trim()}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs font-semibold text-gray-700 truncate">{item.name.trim()}</p>
                <p className="text-xs" style={{ color: "#14532d" }}>{formatCurrency(item.price)}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Account Einstellungen */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-900 text-lg mb-5">⚙️ Konto-Einstellungen</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { icon: "📧", label: "Email ändern", desc: user?.email || "" },
              { icon: "🔒", label: "Passwort ändern", desc: "Zuletzt geändert: —" },
              { icon: "🚪", label: "Abmelden", desc: "Sicher ausloggen", action: async () => { await fetch("/api/users/logout", { method: "POST", credentials: "include" }); navigate("/login"); } },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="flex items-start gap-3 p-4 rounded-2xl bg-stone-50 hover:bg-stone-100 transition text-left w-full"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-400 truncate">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
