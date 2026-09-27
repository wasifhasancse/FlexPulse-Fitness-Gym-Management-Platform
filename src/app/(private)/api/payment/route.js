import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin =
      headersList.get("origin") ||
      process.env.BETTER_AUTH_URL ||
      "http://localhost:3000";
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

    const autoRenewParam = formData.get("autoRenew");
    const isAutoRenew = autoRenewParam !== "false" && autoRenewParam !== false;

    const unitAmount = Math.max(50, Math.round(Number(price || 35) * 100));

    const lineItem = {
      price_data: {
        currency: "usd",
        unit_amount: unitAmount,
        product_data: {
          name: `${className || "Athletic Class"} (${isAutoRenew ? "Monthly Membership" : "1-Month Pass"})`,
          description: isAutoRenew
            ? `Monthly recurring class membership for ${className || "Athletic Training"} at FlexPulse. Unlimited access with auto-renewal.`
            : `Single 30-day class pass for ${className || "Athletic Training"} at FlexPulse. One-time charge, no auto-renewal.`,
        },
      },
      quantity: 1,
    };

    if (isAutoRenew) {
      lineItem.price_data.recurring = { interval: "month" };
    }

    // Create Checkout Session matching athlete's auto-renewal preference
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [lineItem],
      metadata: {
        price: Number(price || 35),
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        classId: classId || "",
        className: className || "",
        trainer: trainer || "",
        duration: duration || "60",
        autoRenew: String(isAutoRenew),
        billingCycle: isAutoRenew ? "monthly" : "one_time_month",
        billingInterval: isAutoRenew ? "month" : "none",
      },
      mode: isAutoRenew ? "subscription" : "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    const accept = headersList.get("accept") || "";
    if (accept.includes("application/json")) {
      return NextResponse.json({ url: session.url });
    }

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("Payment API Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Payment API is working!" });
}
