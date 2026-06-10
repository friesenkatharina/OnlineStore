import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../items.json";

type CartItem = { id: number; quantity: number };
type ShippingInfo = {
  fullName: string;
  address: string;
  city: string;
  zip: string;
  country: string;
};
type PendingOrder = {
  shipping: ShippingInfo;
  items: CartItem[];
  createdAt: string;
};

const Payment = () => {
  const navigate = useNavigate();
  const { clearCart } = useShoppingCart();
  const [order, setOrder] = useState<PendingOrder | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("pendingOrder");
    if (raw) {
      setOrder(JSON.parse(raw));
    } else {
      navigate("/checkoutform");
    }
  }, [navigate]);

  const totalPrice = (items: CartItem[]) =>
    items.reduce((total, ci) => {
      const item = storeItems.find((i) => i.id === ci.id);
      return total + (item?.price || 0) * ci.quantity;
    }, 0);

  const handlePayment = async () => {
    setProcessing(true);

    // Simulation: hier später echten Payment-Provider einbinden
    // z.B. await stripe.confirmPayment(...) oder await paypal.createOrder(...)
    await new Promise((res) => setTimeout(res, 2000));

    localStorage.removeItem("pendingOrder");
    clearCart();
    setProcessing(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1a] text-white">
        <div className="text-6xl mb-4">✓</div>
        <h1 className="text-3xl font-bold mb-2">Bestellung erfolgreich!</h1>
        <p className="text-gray-400 mb-8">
          Danke für deinen Einkauf. Du erhältst eine Bestätigung per E-Mail.
        </p>
        <button
          onClick={() => navigate("/store")}
          className="px-6 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition"
        >
          Weiter shoppen
        </button>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-8">Zahlungsübersicht</h1>

        {/* Bestellte Artikel */}
        <div className="bg-[#2a2a2a] rounded-lg p-5 mb-6">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">
            Bestellte Artikel
          </h2>
          {order.items.map((ci) => {
            const item = storeItems.find((i) => i.id === ci.id);
            if (!item) return null;
            return (
              <div
                key={ci.id}
                className="flex justify-between items-center py-3 border-b border-gray-700 last:border-0"
              >
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-400">
                    {item.subtitle} · x{ci.quantity}
                  </p>
                </div>
                <span className="text-sm font-bold">
                  {formatCurrency(item.price * ci.quantity)}
                </span>
              </div>
            );
          })}
          <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-700">
            <span className="font-bold">Gesamt</span>
            <span className="text-xl font-black">
              {formatCurrency(totalPrice(order.items))}
            </span>
          </div>
        </div>

        {/* Lieferadresse */}
        <div className="bg-[#2a2a2a] rounded-lg p-5 mb-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-3">
            Lieferadresse
          </h2>
          <p className="text-sm font-semibold">{order.shipping.fullName}</p>
          <p className="text-sm text-gray-400">{order.shipping.address}</p>
          <p className="text-sm text-gray-400">
            {order.shipping.zip} {order.shipping.city}
          </p>
          <p className="text-sm text-gray-400">{order.shipping.country}</p>
        </div>

        {/* Simulationshinweis */}
        <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4 mb-6 text-sm text-yellow-300">
          <strong>Simulation aktiv:</strong> Kein echtes Zahlungssystem. Klicke
          unten um eine Bestellung zu simulieren.
        </div>

        <button
          onClick={handlePayment}
          disabled={processing}
          className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? "Wird verarbeitet…" : "Jetzt bezahlen (Simulation)"}
        </button>

        <button
          onClick={() => navigate("/checkoutform")}
          disabled={processing}
          className="w-full py-3 mt-3 border border-gray-600 text-gray-400 text-sm rounded hover:border-gray-400 transition disabled:opacity-50"
        >
          Zurück zur Adresse
        </button>
      </div>
    </div>
  );
};

export default Payment;
