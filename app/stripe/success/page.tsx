"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "failure">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const clientSecret = searchParams.get("payment_intent_client_secret");
    if (!clientSecret) {
      setStatus("failure");
      setMessage("No payment information found.");
      return;
    }

    stripePromise.then((stripe) => {
      if (!stripe) return;
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        console.log("paymentIntent", paymentIntent);
        switch (paymentIntent?.status) {
          case "succeeded":
            setStatus("success");
            setMessage("Your payment was successful!");
            break;
          case "processing":
            setStatus("success");
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setStatus("failure");
            setMessage("Payment failed. Please try again.");
            break;
          default:
            setStatus("failure");
            setMessage("Something went wrong.");
        }
      });
    });
  }, [searchParams]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center space-y-6">
        {status === "loading" && (
          <p className="text-gray-500 text-lg">Verifying payment...</p>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 text-6xl">✓</div>
            <h1 className="text-2xl font-bold text-green-600">
              Payment Successful
            </h1>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === "failure" && (
          <>
            <div className="text-red-500 text-6xl">✕</div>
            <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        <Link
          href="/stripe"
          className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
