import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const PRICE_ID = process.env.STRIPE_SELLER_PRO_PRICE_ID;
    const userSession = await auth.api.getSession({ headers: await headers() });
    const user = userSession?.user;

     const formData = await request.formData();
     const price = formData.get("price");
     const className = formData.get("className");
     const trainer = formData.get("trainer");
    const classId = formData.get("classId");
    const duration = formData.get("duration");
    const status = formData.get("status");

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }
    if (status === "banned") {
      return NextResponse.json(
        { error: "Action restricted by Admin." },
        { status: 403 },
      );
    }

    // Create Checkout Sessions from body params.
    // const price = await stripe.prices.retrieve(PRICE_ID);
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price_data: {
            currency: "usd",
            unit_amount: Number(price) * 100, // Convert to cents
            product_data: {
              name: className,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        price: Number(price),
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        classId,
        className,
        trainer,
        duration,
      },
      mode: "payment", // Use "payment" for one-time payments, subscription for recurring payments
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Payment API is working!" });
}
