import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/getSession";

export async function POST(request) {
  try {
    const user = await getUserSession();
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { subscriptionId, sessionId, autoRenew, classId, userId } = body;

    let stripeUpdated = false;

    // 1. If subscriptionId exists in Stripe, update cancel_at_period_end
    if (subscriptionId && subscriptionId.startsWith("sub_")) {
      try {
        await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: !autoRenew, // if autoRenew is false, cancel_at_period_end is true
        });
        stripeUpdated = true;
      } catch (stripeErr) {
        console.warn("Stripe subscription update warning:", stripeErr.message);
      }
    }

    // 2. Update booking status in the backend if classId is present
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
    try {
      if (userId && classId) {
        await fetch(`${serverUrl}/api/updateSubscriptionStatus`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId || user.id,
            classId,
            bookingId: body.bookingId,
            autoRenew,
            subscriptionStatus: autoRenew ? "active" : "cancelled_at_period_end",
          }),
        });
      }
    } catch (backendErr) {
      // Non-blocking fallback
    }

    return NextResponse.json({
      success: true,
      autoRenew,
      message: autoRenew
        ? "Auto-renewal reactivated. Your monthly class membership will renew automatically."
        : "Auto-renewal cancelled. You will not be charged again. Your access remains active until the end of the current billing cycle.",
    });
  } catch (err) {
    console.error("Toggle renew error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update auto-renewal settings." },
      { status: 500 }
    );
  }
}
