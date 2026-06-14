import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAJOR_API_KEY!,
  key_secret: process.env.RAJOR_SECRET_KEY!,
});

// POST /api/rajorpay — create a new order
export async function POST(request: NextRequest) {
  try {
    const { amount = 5000, currency = "INR" } = await request
      .json()
      .catch(() => ({}));

    const order = await razorpay.orders.create({
      amount, // in paise (5000 = ₹50)
      currency,
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAJOR_API_KEY,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create order",
      },
      { status: 500 },
    );
  }
}

// PUT /api/rajorpay — verify payment signature after completion
export async function PUT(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Missing payment verification fields" },
        { status: 400 },
      );
    }

    // Verify signature: HMAC-SHA256 of "orderId|paymentId" using secret key
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAJOR_SECRET_KEY!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    console.error("Razorpay verify error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Verification failed",
      },
      { status: 500 },
    );
  }
}
