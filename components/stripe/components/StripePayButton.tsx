"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

// Inner form — rendered inside <Elements> provider
function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Validation failed");
      setLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/stripe/success`,
      },
    });

    // If we reach here, confirmPayment failed (success redirects automatically)
    if (confirmError) {
      setError(confirmError.message ?? "Payment failed");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <PaymentElement />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay ₹5000.00"}
      </button>
    </form>
  );
}

// Outer button — fetches clientSecret and mounts the Stripe Elements
export default function StripePayButton() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initPayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 5000, currency: "inr" }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setClientSecret(data.clientSecret);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to initiate payment",
      );
    } finally {
      setLoading(false);
    }
  };

  if (clientSecret) {
    return (
      <div className="w-full max-w-md">
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: { theme: "stripe" } }}
        >
          <CheckoutForm />
        </Elements>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={initPayment}
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Loading..." : "Pay Now"}
      </button>
    </div>
  );
}
