import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 1000 }),
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
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

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const billingDetailsFormatted = {
      name: billingDetails.fullName,
      email: billingDetails.email,
      address: {
        line1: billingDetails.address,
        city: billingDetails.city,
        postal_code: billingDetails.zip,
        country: billingDetails.country,
      },
    };

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
      billing_details: billingDetailsFormatted,
    });

    if (error) {
      console.log("[error]", error);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    if (clientSecret) {
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (confirmError) {
        console.log("[confirmError]", confirmError);
      } else {
        console.log("[PaymentIntent]", paymentIntent);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "450px" }}>
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
      </div>
      <div
        style={{
          marginTop: "100px ",

          width: "300px",
        }}
      >
        {" "}
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "12px",
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
