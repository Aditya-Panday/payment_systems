"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function PaypalSuccessContent() {
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<"loading" | "success" | "failure">(
    "loading",
  );

  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const paymentId = searchParams.get("paymentId");
        const payerId = searchParams.get("PayerID");

        if (!paymentId || !payerId) {
          setStatus("failure");
          setMessage("Payment information missing.");
          return;
        }

        const response = await fetch(
          `/api/paypal/verify?paymentId=${paymentId}&PayerID=${payerId}`,
        );

        const data = await response.json();

        if (data.success) {
          setStatus("success");
          setMessage("Your payment was successful!");
        } else {
          setStatus("failure");
          setMessage(data.message || "Payment verification failed.");
        }
      } catch (error) {
        console.error("PayPal verification error:", error);

        setStatus("failure");
        setMessage("Something went wrong during verification.");
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center space-y-6">
        {status === "loading" && (
          <div className="space-y-4">
            <div className="w-10 h-10 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
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
          href="/paypal"
          className="inline-block px-6 py-3 rounded-lg bg-[#FFC439] text-[#003087] font-bold hover:bg-[#f0b429] transition"
        >
          Back to PayPal
        </Link>
      </div>
    </main>
  );
}

export default function PaypalSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center space-y-4">
            <div className="w-10 h-10 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500">Loading...</p>
          </div>
        </main>
      }
    >
      <PaypalSuccessContent />
    </Suspense>
  );
}
