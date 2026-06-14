import Paypal from "@/components/paypal/paypal";
import PaypalButton from "@/components/paypal/components/PaypalButton";

const Page = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-3xl w-full">
        <div className="space-y-8">
          <Paypal />
          <div className="flex justify-center">
            <PaypalButton />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
