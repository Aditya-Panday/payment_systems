"use client";
const StripePayButtonSecond = () => {
  const handlePayment = async () => {
    try {
      const response = await fetch("/api/stripe/stripe-second", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
      console.log("API Response:", data);

      if (data.checkoutUrl) {
        console.log("Checkout URL:", data.checkoutUrl);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  return (
    <button
      onClick={handlePayment}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
    >
      Pay with Stripe
    </button>
  );
};

export default StripePayButtonSecond;
