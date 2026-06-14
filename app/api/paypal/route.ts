import paypal from "paypal-rest-sdk";
import { NextResponse } from "next/server";

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID!,
  client_secret: process.env.PAYPAL_SECRET_KEY!,
});

export async function POST() {
  try {
    const createPaymentJson = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:3000/paypal/success",
        cancel_url: "http://localhost:3000/paypal/cancel",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "item",
                sku: "item",
                price: "1.00",
                currency: "USD", // INR may not be supported in this legacy SDK flow
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: "1.00",
          },
          description: "This is the payment description.",
        },
      ],
    };

    const payment = await new Promise<unknown>((resolve, reject) => {
      paypal.payment.create(createPaymentJson, (error, payment) => {
        if (error) {
          reject(error);
        } else {
          resolve(payment);
        }
      });
    });

    console.log("Payment Created:", payment);

    const paymentData = payment as { links: { rel: string; href: string }[] };
    const approvalUrl = paymentData.links.find(
      (link) => link.rel === "approval_url",
    )?.href;

    return NextResponse.json(
      {
        success: true,
        approvalUrl,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PayPal Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create PayPal payment",
      },
      { status: 500 },
    );
  }
}
