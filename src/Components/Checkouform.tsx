import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

function CheckoutForm() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { cartItems } = useShoppingCart();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullName || !address || !city || !zip || !country) {
      setError("Bitte alle Felder ausfüllen.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Dein Warenkorb ist leer.");
      return;
    }

    // Bestellung lokal speichern – später durch echten Payment-Provider ersetzen
    const pendingOrder = {
      shipping: { fullName, address, city, zip, country },
      items: cartItems,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("pendingOrder", JSON.stringify(pendingOrder));

    navigate("/payment");
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-[#1a1a1a] text-white flex justify-center items-center p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6">Lieferadresse</h2>
          {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

          <div className="mb-4">
            <input
              className="w-full p-3 rounded bg-[#2a2a2a] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
              type="text"
              placeholder="Vollständiger Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 rounded bg-[#2a2a2a] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
              type="text"
              placeholder="Straße & Hausnummer"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 rounded bg-[#2a2a2a] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
              type="text"
              placeholder="Stadt"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 rounded bg-[#2a2a2a] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
              type="text"
              placeholder="Postleitzahl"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 rounded bg-[#2a2a2a] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
              type="text"
              placeholder="Land"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition mt-2"
          >
            Weiter zur Zahlung
          </button>
        </form>
      </div>

      <div className="w-1/2 flex justify-center items-center bg-teal-800">
        <h2 className="text-3xl text-white font-bold">Bestellung abschließen</h2>
      </div>
    </div>
  );
}

export default CheckoutForm;
