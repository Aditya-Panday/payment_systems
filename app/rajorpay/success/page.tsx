import Link from "next/link";

export default function RazorpaySuccess() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center space-y-6">
        <div className="text-green-500 text-6xl">✓</div>
        <h1 className="text-2xl font-bold text-green-600">
          Payment Successful
        </h1>
        <p className="text-gray-600">
          Your payment was processed successfully.
        </p>
        <Link
          href="/rajorpay"
          className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Go Back
        </Link>
      </div>
    </main>
  );
}
