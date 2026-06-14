import Link from "next/link";

export default function PaypalCancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center space-y-6">
        <div className="text-yellow-500 text-6xl">⚠</div>
        <h1 className="text-2xl font-bold text-yellow-600">
          Payment Cancelled
        </h1>
        <p className="text-gray-600">
          You cancelled the payment. No charges were made.
        </p>
        <Link
          href="/paypal"
          className="inline-block px-6 py-3 rounded-lg bg-[#FFC439] text-[#003087] font-bold hover:bg-[#f0b429] transition"
        >
          Try Again
        </Link>
      </div>
    </main>
  );
}
