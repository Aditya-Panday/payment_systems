"use client";

import { useState } from "react";

const StripePayButtonSecond = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/stripe/stripe-second", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("API Response:", data);

      if (data.checkoutUrl) {
        // Button text "Redirecting to Stripe..." rahega
        // jab tak browser redirect nahi ho jata
        window.location.href = data.checkoutUrl;
        return;
      }

      setLoading(false);
    } catch (error) {
      console.error("API Error:", error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="cursor-pointer"
    >
      {loading ? "Redirecting to Stripe..." : "Pay with Stripe"}
    </button>
  );
};

export default StripePayButtonSecond;
