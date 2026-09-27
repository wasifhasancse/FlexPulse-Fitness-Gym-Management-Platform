import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import SuccessReceiptClient from "@/components/Payment/SuccessReceiptClient";

export const metadata = {
  title: "Payment Receipt & Booking Confirmation - FlexPulse",
  description:
    "Official payment receipt and booking confirmation for your FlexPulse athletic training session. Certified Stripe payment gateway verification.",
};

export default async function Success({ searchParams, params }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/dashboard/member/bookings");
  }

  let session = null;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: [
        "line_items",
        "payment_intent",
        "payment_intent.payment_method",
        "subscription",
        "subscription.default_payment_method",
      ],
    });
  } catch (err) {
    console.error("Failed to retrieve Stripe session:", err);
    redirect("/dashboard/member/bookings");
  }

  if (session?.status === "open") {
    redirect("/");
  }

  const metadata = session?.metadata || {};
  const customerEmail = session?.customer_details?.email || metadata.userEmail || "athlete@flexpulse.com";

  const {
    className = "Athletic Training Session",
    image = "",
    trainer = "Coach Marcus Vance",
    price = 35,
    duration = 45,
    classId = "",
    userId = "",
    userName = "FlexPulse Athlete",
    billingCycle = "monthly",
  } = metadata;

  const isAutoRenew =
    metadata.autoRenew === "true" ||
    (metadata.autoRenew !== "false" && Boolean(session?.subscription));

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  if (session?.status === "complete") {
    try {
      const transactionData = {
        userId,
        userEmail: customerEmail,
        userName,
        className,
        classId,
        sessionId: session_id,
        transactionId: session_id,
        amount: Number(price),
        autoRenew: isAutoRenew,
        billingCycle: isAutoRenew ? "monthly" : "one_time_month",
        planType: isAutoRenew ? "Monthly Membership Pass" : "Single 1-Month Pass",
        paymentGateway: "Stripe",
        currency: "USD",
        status: "completed",
      };

      await fetch(`${serverUrl}/api/transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });

      if (userId && classId) {
        const checkRes = await fetch(
          `${serverUrl}/api/checkBooking?userId=${userId}&classId=${classId}`
        );
        const checkData = await checkRes.json();
        const isBooked = Boolean(checkData?.isBooked);

        if (!isBooked) {
          const subscriptionId =
            typeof session?.subscription === "string"
              ? session.subscription
              : session?.subscription?.id || null;

          const bookData = {
            bookingCount: 1,
            classId,
            className,
            trainer,
            price: Number(price),
            duration,
            image,
            userEmail: customerEmail,
            userId,
            userName,
            paymentStatus: "paid",
            status: "active",
            autoRenew: isAutoRenew,
            subscriptionStatus: isAutoRenew ? "active" : "cancelled_at_period_end",
            subscriptionId,
            billingCycle: isAutoRenew ? "monthly" : "one_time_month",
            plan: isAutoRenew ? "Monthly Membership" : "1-Month Pass",
            sessionId: session_id,
            transactionId: session_id,
            paymentGateway: "Stripe",
            bookedAt: new Date(),
          };

          await fetch(`${serverUrl}/api/bookClass`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookData),
          });
        }
      }
    } catch (err) {
      console.error("Error saving booking/transaction records:", err);
    }
  }

  // Extract exact payment method used
  let paymentMethodDetails = {
    brand: "visa",
    last4: "4242",
    type: "card",
    funding: "credit",
    wallet: null,
  };

  const piMethod = session?.payment_intent?.payment_method;
  if (piMethod && typeof piMethod === "object" && piMethod.card) {
    paymentMethodDetails = {
      brand: piMethod.card.display_brand || piMethod.card.brand || "card",
      last4: piMethod.card.last4 || "4242",
      type: piMethod.type || "card",
      funding: piMethod.card.funding || "credit",
      wallet: piMethod.card.wallet?.type || null,
      expMonth: piMethod.card.exp_month,
      expYear: piMethod.card.exp_year,
    };
  } else {
    const subMethod = session?.subscription?.default_payment_method;
    if (subMethod && typeof subMethod === "object" && subMethod.card) {
      paymentMethodDetails = {
        brand: subMethod.card.display_brand || subMethod.card.brand || "card",
        last4: subMethod.card.last4 || "4242",
        type: subMethod.type || "card",
        funding: subMethod.card.funding || "credit",
        wallet: subMethod.card.wallet?.type || null,
        expMonth: subMethod.card.exp_month,
        expYear: subMethod.card.exp_year,
      };
    }
  }

  const subscriptionId =
    typeof session?.subscription === "string"
      ? session.subscription
      : session?.subscription?.id || null;

  const receiptData = {
    sessionId: session_id,
    subscriptionId,
    customerEmail,
    className,
    trainer,
    price: Number(price) || 35,
    duration: Number(duration) || 45,
    classId,
    userName,
    userId,
    transactionId: session_id,
    paymentGateway: "Stripe",
    billingCycle: isAutoRenew ? "monthly" : "one_time_month",
    autoRenew: isAutoRenew,
    paymentMethod: paymentMethodDetails,
    status: session?.status || "complete",
  };

  return <SuccessReceiptClient receiptData={receiptData} />;
}
