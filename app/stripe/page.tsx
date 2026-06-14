import StripePayButton from "@/components/stripe/components/StripePayButton";
import StripePayButtonSecond from "@/components/stripe/components/StripePayButtonSecond";
import StripePay from "@/components/stripe/stripePay";

const Page = () => {
  return (
    <div>
      {" "}
      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-10 max-w-3xl w-full">
          <div className="space-y-8">
            <StripePay />

            <div className="flex justify-center">
              <StripePayButton />
            </div>
            <div className="flex justify-center">
              <StripePayButtonSecond />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
