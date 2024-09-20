const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    const { amount } = await request.json();
    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
      throw new Error("Invalid amount provided");
    }
    console.log("API call amount is", amount);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount), // Ensure amount is an integer
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return NextResponse.json(
      { error: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}
