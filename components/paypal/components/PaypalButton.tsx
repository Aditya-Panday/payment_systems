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
        className="flex items-center gap-3 bg-[#FFC439] hover:bg-[#f0b429] disabled:opacity-60 disabled:cursor-not-allowed text-[#003087] font-bold px-8 py-3 rounded-full text-lg transition-all shadow-md"
      >
        {loading ? (
          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#003087]" />
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M7.5 21H3L5.5 7h6.5c3.5 0 5.5 1.5 5 4.5-.5 3-3 4.5-6 4.5H8L7.5 21z"
              fill="#003087"
            />
            <path
              d="M10.5 17H6L8.5 3h6.5c3.5 0 5.5 1.5 5 4.5-.5 3-3 4.5-6 4.5H11L10.5 17z"
              fill="#009cde"
            />
          </svg>
        )}
        {loading ? "Redirecting to PayPal..." : "Pay with PayPal"}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default PaypalButton;
