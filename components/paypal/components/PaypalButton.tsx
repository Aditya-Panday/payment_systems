"use client";

import { useState } from "react";

const PaypalButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/paypal", { method: "POST" });
      const data = await res.json();

      if (data.success && data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        setError(data.message || "Payment initiation failed");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="cursor-pointer"
      >
        {loading ? "Redirecting to PayPal..." : "Pay with PayPal"}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default PaypalButton;
