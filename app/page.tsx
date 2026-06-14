import PaytmButton from "@/components/paytm/components/PaytmButton";
import PaytmPage from "@/components/paytm/paytmPage";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script
        type="application/javascript"
        crossOrigin="anonymous"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MERCHANT_ID}.js`}
        strategy="afterInteractive"
      />
      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-10 max-w-3xl w-full">
          <div className="space-y-8">
            <PaytmPage />

            <div className="flex justify-center">
              <PaytmButton />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
