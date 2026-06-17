"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

function SuccessContent() {
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<"loading" | "success" | "failure">(
    "loading",
  );

  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const clientSecret = searchParams.get("payment_intent_client_secret");

        if (!clientSecret) {
          setStatus("failure");
          setMessage("No payment information found.");
          return;
        }

        const stripe = await stripePromise;

        if (!stripe) {
          setStatus("failure");
          setMessage("Unable to load Stripe.");
          return;
        }

        const { paymentIntent } =
          await stripe.retrievePaymentIntent(clientSecret);

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
      } catch (error) {
        console.error("Payment verification error:", error);

        setStatus("failure");
        setMessage("Error verifying payment.");
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center space-y-6">
        {status === "loading" && (
          <div className="space-y-4">
            <div className="w-10 h-10 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 text-lg">Verifying payment...</p>
          </div>
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

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center space-y-4">
            <div className="w-10 h-10 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500">Loading...</p>
          </div>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
