"use client";

import Script from "next/script";
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
    if (process.env.NEXT_PUBLIC_PAYTM_MERCHANT_ID) {
      alert("Not available right now.");

      return;
    }

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
    <>
      <Script
        type="application/javascript"
        crossOrigin="anonymous"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MERCHANT_ID}.js`}
        strategy="afterInteractive"
      />
      <button onClick={initiatePayment} disabled={loading}>
        {loading ? "Please Wait..." : "Pay Now"}
      </button>
    </>
  );
}
