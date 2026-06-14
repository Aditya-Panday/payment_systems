import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    const product = await stripe.products.create({
      name: "T-shirt",
      images: ["https://picsum.photos/300/400"],
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 100 * 100,
      currency: "inr",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: "adityapanday@gmail.com",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error("Stripe error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Payment initiation failed",
      },
      { status: 500 },
    );
  }
}
