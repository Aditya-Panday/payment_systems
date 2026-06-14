import paypal from "paypal-rest-sdk";
import { NextRequest, NextResponse } from "next/server";

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID!,
  client_secret: process.env.PAYPAL_SECRET_KEY!,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const paymentId = searchParams.get("paymentId");
  const PayerID = searchParams.get("PayerID");

  if (!paymentId || !PayerID) {
    return NextResponse.json(
      { success: false, message: "Missing paymentId or PayerID" },
      { status: 400 },
    );
  }

  try {
    const executePaymentJson = { payer_id: PayerID };

    const payment = await new Promise<unknown>((resolve, reject) => {
      paypal.payment.execute(
        paymentId,
        executePaymentJson,
        (error, payment) => {
          if (error) {
            reject(error);
          } else {
            resolve(payment);
          }
        },
      );
    });

    console.log("Payment Executed:", payment);

    return NextResponse.json({ success: true, payment }, { status: 200 });
  } catch (error) {
    console.error("PayPal Verify Error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Payment verification failed",
      },
      { status: 500 },
    );
  }
}
