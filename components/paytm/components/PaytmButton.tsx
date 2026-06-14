"use client";

import { useState } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any -- req */
declare global {
  interface Window {
    Paytm?: any;
  }
}

export default function PaytmButton() {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/paytm", {
        method: "POST",
      });
      console.log("Response", response);
      const data = await response.json();
      console.log("API data", data);

      if (!data.success) {
        throw new Error("Token generation failed");
      }

      if (!data.txnToken) {
        throw new Error("Transaction token missing from response");
      }

      if (!window.Paytm || !window.Paytm.CheckoutJS) {
        throw new Error(
          "Paytm CheckoutJS not loaded. Check that the script src is correct and the merchant ID is valid.",
        );
      }

      const config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId: data.orderId,
          token: data.txnToken,
          tokenType: "TXN_TOKEN",
          amount: "1.00",
        },

        handler: {
          notifyMerchant: function (eventName: string, data: any) {
            console.log(eventName, data);
          },
        },
      };

      window.Paytm.CheckoutJS.init(config)
        .then(function () {
          console.log("Payment initiated");
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function (error: any) {
          alert("Payment initiation failed");
          console.log(error);
        });
    } catch (error) {
      console.error(error);
      alert("Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={initiatePayment}
      disabled={loading}
      className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
    >
      {loading ? "Generating Token..." : "Pay Now"}
    </button>
  );
}
