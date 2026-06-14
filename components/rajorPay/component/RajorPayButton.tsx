"use client";

import { useState } from "react";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  handler: (response: RazorpayPaymentResponse) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export default function RajorPayButton() {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async () => {
    try {
      setLoading(true);

      // Step 1: Create order
      const res = await fetch("/api/rajorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 5000, currency: "INR" }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay SDK not loaded. Please refresh and try again.",
        );
      }

      // Step 2: Open Razorpay checkout
      const options: RazorpayOptions = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "Payment Systems",
        description: "Test Payment",
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#2563eb" },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
        handler: async (response: RazorpayPaymentResponse) => {
          try {
            // Step 3: Verify payment on server
            const verifyRes = await fetch("/api/rajorpay", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              window.location.href = `/rajorpay/success?payment_id=${response.razorpay_payment_id}`;
            } else {
              window.location.href = `/rajorpay/failure`;
            }
          } catch {
            window.location.href = `/rajorpay/failure`;
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Payment initiation failed",
      );
      setLoading(false);
    }
  };

  return (
    <button
      onClick={initiatePayment}
      disabled={loading}
      className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
    >
      {loading ? "Loading..." : "Pay Now"}
    </button>
  );
}

//  config: {
//           display: {
//             blocks: {
//               upi: {
//                 name: "Pay via UPI",
//                 instruments: [{ method: "upi" }],
//               },
//               other: {
//                 name: "Other Payment Methods",
//                 instruments: [
//                   { method: "card" },
//                   { method: "netbanking" },
//                   { method: "wallet" },
//                 ],
//               },
//             },
//             sequence: ["block.upi", "block.other"],
//             preferences: { show_default_blocks: false },
//           },
//         },
