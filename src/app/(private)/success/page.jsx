import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FaCalendarCheck,
  FaCheckCircle,
  FaClock,
  FaDollarSign,
  FaUser,
} from "react-icons/fa";

export const metadata = {
  title: "Payment Successful - FlexPulse",
  description:
    "Your payment was successful. A confirmation email has been sent to your inbox. Thank you for booking a class with FlexPulse. We look forward to seeing you in the class!",
};

export default async function Success({ searchParams, params }) {
  const { id } = await params;
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    metadata,
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  const {
    className,
    image,
    trainer,
    price,
    duration,
    classId,
    userId,
    userName,
    userEmail,
  } = metadata;

  if (status === "complete") {
    // transaction routes and transactionCollection
    // app.post("/api/transaction", async (req, res) => {
    //   const { userId, classId, sessionId, transactionId, amount } = req.body;
    //   const activeResult = await ensureUserActive({ userId }, res);
    //   if (!activeResult.ok) return;
    //   const transactionData = {
    //     userId,
    //     classId,
    //     sessionId,
    //     transactionId,
    //     amount,
    //   };
    //   const result = await transactionCollection.insertOne(transactionData);
    //   res.status(201).json(result);
    // });
    // this is backend route, if my payment is successful, I will call this route to store the transaction in the database. I will also check if the user has already booked this class, if not, I will book the class for the user.

    const transactionData = {
      userId,
      classId,
      sessionId: session_id,
      transactionId: session_id,
      amount: price,
    };

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/transaction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionData),
    });

    const checkRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/checkBooking?userId=${userId}&classId=${classId}`,
    );
    const { isBooked } = await checkRes.json();

    if (!isBooked) {
      const bookData = {
        classId,
        className,
        trainer,
        price,
        duration,
        image,
        userEmail: customerEmail,
        userId,
        userName,
        paymentStatus: "paid",
        status: "pending",
        sessionId: session_id,
        transactionId: session_id,
        bookedAt: new Date(),
      };
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookClass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });
    }

    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 transition-colors duration-300">
        <div className="w-full max-w-2xl bg-white dark:bg-brand-800/20 rounded-2xl shadow-card border border-brand-500/15 dark:border-brand-500/30 p-8 md:p-12">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <FaCheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-center text-foreground">
            Payment Successful!
          </h1>
          <p className="font-['Inter'] text-center text-[#535C91] dark:text-[#9290C3] mt-2">
            Thank you for your booking. A confirmation email has been sent to{" "}
            <span className="font-semibold text-foreground">
              {customerEmail}
            </span>
            .
          </p>

          {/* Booking Summary */}
          <div className="mt-8 bg-[#535C91]/5 dark:bg-[#1b1a55]/40 rounded-xl p-6 space-y-3 border border-brand-500/20 dark:border-brand-500/30">
            <h2 className="font-['Inter'] text-sm font-bold uppercase tracking-wider text-[#535C91] dark:text-[#9290C3]">
              Booking Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3">
                <FaCalendarCheck className="w-5 h-5 text-active" />
                <div>
                  <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
                    Class
                  </p>
                  <p className="font-['Inter'] font-semibold text-foreground">
                    {className}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaUser className="w-5 h-5 text-active" />
                <div>
                  <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
                    Trainer
                  </p>
                  <p className="font-['Inter'] font-semibold text-foreground">
                    {trainer}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="w-5 h-5 text-active" />
                <div>
                  <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
                    Duration
                  </p>
                  <p className="font-['Inter'] font-semibold text-foreground">
                    {duration} minutes
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaDollarSign className="w-5 h-5 text-active" />
                <div>
                  <p className="font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
                    Price
                  </p>
                  <p className="font-['Inter'] font-semibold text-foreground">
                    ${price}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard/member/bookings"
              className="flex-1 text-center py-3 bg-btn-bg text-btn-text font-['Inter'] font-semibold rounded-xl hover:opacity-90 transition-colors shadow-sm cursor-pointer border border-brand-500/20"
            >
              View My Bookings
            </Link>
            <Link
              href="/all-classes"
              className="flex-1 text-center py-3 border-2 border-brand-500/20 text-[#535C91] dark:text-[#9290C3] font-['Inter'] font-semibold rounded-xl hover:border-active hover:text-active transition-all cursor-pointer"
            >
              Browse More Classes
            </Link>
          </div>

          {/* Extra info */}
          <p className="mt-6 text-center font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
            If you have any questions, please email{" "}
            <a
              href="mailto:support@flexpulse.com"
              className="text-active hover:underline"
            >
              support@flexpulse.com
            </a>
            .
          </p>
        </div>
      </div>
    );
  }
}
