import RajorPayButton from "@/components/rajorPay/component/RajorPayButton";
import RajorPay from "@/components/rajorPay/rajorPay";
import Script from "next/script";

const Page = () => {
  return (
    <div>
      <Script
        type="application/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-10 max-w-3xl w-full">
          <div className="space-y-8">
            <RajorPay />

            <div className="flex justify-center">
              <RajorPayButton />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
