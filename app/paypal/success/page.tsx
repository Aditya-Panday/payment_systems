"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaypalSuccessPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "failure">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const paymentId = searchParams.get("paymentId");
    const PayerID = searchParams.get("PayerID");

    if (!paymentId || !PayerID) {
      setStatus("failure");
      setMessage("Payment information missing.");
      return;
    }

    fetch(`/api/paypal/verify?paymentId=${paymentId}&PayerID=${PayerID}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
          setMessage("Your payment was successful!");
        } else {
          setStatus("failure");
          setMessage(data.message || "Payment verification failed.");
        }
      })
      .catch(() => {
        setStatus("failure");
        setMessage("Something went wrong during verification.");
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
          href="/paypal"
          className="inline-block px-6 py-3 rounded-lg bg-[#FFC439] text-[#003087] font-bold hover:bg-[#f0b429] transition"
        >
          Back to PayPal
        </Link>
      </div>
    </main>
  );
}
