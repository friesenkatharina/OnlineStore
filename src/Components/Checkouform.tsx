//  Formular zur Eingabe von Versandinformationen bereitstellt.

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Image from "../assets/shopping-cart.svg";

function CheckoutForm() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullName || !address || !city || !zip || !country) {
      setError("All fields must be filled out.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to perform this action.");
        return;
      }

      await axios.post(
        "http://localhost:5000/shipping",
        { fullName, address, city, zip, country },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      navigate("/payment");
    } catch (error: any) {
      setError(
        `Error during registration: ${
          error.response?.data.message || error.message
        }`
      );
      console.error("Error during registration:", error.response || error);
    }
  };

  return (
    <>
      <div>
        <div className="w-1/2 h-half bg-[#1a1a1a] text-white flex justify-center items-center">
          <form onSubmit={handleSubmit}>
            {error && <p className="error text-red-500">{error}</p>}
            <div className="mb-4" style={{ width: "150px" }}>
              <input
                className="w-full p-2 rounded"
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-4" style={{ width: "150px" }}>
              <input
                className="w-full p-2 rounded"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-4" style={{ width: "150px" }}>
              <input
                className="w-full p-2 rounded"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="mb-4" style={{ width: "150px" }}>
              <input
                className="w-full p-2 rounded"
                type="text"
                placeholder="Zip Code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
            <div className="mb-4" style={{ width: "150px" }}>
              <input
                className="w-full p-2 rounded"
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <button className="py-2 px-2 bg-blue-500 text-black rounded hover:bg-blue-600">
              Continue to Payment
            </button>
            <img
              style={{ width: "200px", position: "absolute", left: "30%" }}
              src={Image}
              alt=""
            />
          </form>
        </div>
        <div className="w-1/2 h-full flex justify-center items-center bg-teal-800">
          <h2 className="text-3xl text-white">Complete Your Order</h2>
        </div>
      </div>
    </>
  );
}

export default CheckoutForm;

// Grundstruktur

// State-Variablen:
// fullName, address, city, zip, country speichern die Werte der Eingabefelder des Formulars.
// error speichert Fehlermeldungen, die während der Verarbeitung des Formulars auftreten können.

// Navigations-Hook: useNavigate wird verwendet, um den Nutzer nach erfolgreicher Verarbeitung des Formulars auf eine andere Seite weiterzuleiten.

// Formular-Handling

// handleSubmit:
// Wird aufgerufen, wenn das Formular abgesendet wird.
// Überprüft zunächst, ob alle Felder ausgefüllt sind. Wenn nicht, wird eine Fehlermeldung gesetzt und die Funktion bricht ab.
// Überprüft, ob ein gültiger Token im LocalStorage vorhanden ist, was notwendig ist, um sicherzustellen, dass der Nutzer angemeldet ist.
// Sendet die eingegebenen Daten an einen Server, wenn alle Überprüfungen erfolgreich waren. Verwendet dabei die Axios-Bibliothek, um eine POST-Anfrage an die URL http://localhost:5000/shipping zu senden. Die Daten des Formulars werden zusammen mit dem Authentifizierungstoken im Request-Header gesendet.
// Bei erfolgreichem Request wird der Nutzer zu einer Erfolgsseite weitergeleitet.
// Bei einem Fehler wird die Fehlermeldung aktualisiert und angezeigt.
