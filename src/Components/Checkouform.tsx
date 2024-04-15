import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [billingDetails, setBillingDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });
  const [errors, setErrors] = useState({
    cardError: "",
    formError: "",
  });

  const stripe = useStripe();
  const elements = useElements();
  const authToken = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: 1000 }), // Betrag sollte entsprechend Ihrer Logik angepasst werden
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { fullName, address, city, zip, country } = billingDetails;
    if (!fullName || !address || !city || !zip || !country) {
      setErrors({ ...errors, formError: "All fields must be filled out." });
      return;
    }

    if (!stripe || !elements) {
      setErrors((errors) => ({
        ...errors,
        formError: "Stripe not loaded correctly.",
      }));
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setErrors((errors) => ({
        ...errors,
        cardError: "Incomplete card information.",
      }));
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/shipping",
        { fullName, address, city, zip, country },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      console.log("Shipping Info Saved:", response.data);

      // Versuche die Zahlung zu verarbeiten
      const paymentResult = await handlePayment(card, billingDetails);
      if (paymentResult.error) {
        setErrors((errors) => ({
          ...errors,
          cardError: paymentResult.error.message,
        }));
        return;
      }

      // Weiterleitung oder Bestätigungslogik hier einfügen
      console.log("Payment successful:", paymentResult);
    } catch (error) {
      console.error(
        "Failed to save shipping info:",
        error.response || error.message
      );
      setErrors((errors) => ({
        ...errors,
        formError:
          "Failed to save shipping information. " +
          (error.response?.data.message || error.message),
      }));
    }
  };

  const handlePayment = async (card, billingDetails) => {
    try {
      if (!stripe) {
        return { error: { message: "Stripe not loaded correctly." } };
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: card,
        billing_details: {
          name: billingDetails.fullName,
          email: billingDetails.email, // Stellen Sie sicher, dass E-Mail-Adresse vorhanden ist
          address: {
            line1: billingDetails.address,
            city: billingDetails.city,
            postal_code: billingDetails.zip,
            country: billingDetails.country,
          },
        },
      });

      if (error) {
        return { error };
      }

      // Hier können weitere Zahlungsverarbeitungsschritte folgen
      return { paymentMethod };
    } catch (error) {
      console.error("Error during payment:", error);
      return { error };
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "450px" }}>
      {errors.formError && <p className="error">{errors.formError}</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <input
          type="text"
          name="fullName"
          value={billingDetails.fullName}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <input
          type="text"
          name="address"
          value={billingDetails.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="city"
          value={billingDetails.city}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          type="text"
          name="zip"
          value={billingDetails.zip}
          onChange={handleChange}
          placeholder="Postal Code"
        />
        <input
          type="text"
          name="country"
          value={billingDetails.country}
          onChange={handleChange}
          placeholder="Country"
        />

        <button>Continue</button>
      </div>
      <div style={{ marginTop: "100px ", width: "300px" }}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {},
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          style={{
            marginLeft: "20px",
            marginTop: "30px",
            backgroundColor: "green",
          }}
        >
          Pay
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
