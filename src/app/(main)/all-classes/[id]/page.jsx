import ClassDetailsPageLayout from "@/components/AllClasses/ClassDetailsPage";
import { getClassById } from "@/lib/api/getClasses";
import { auth } from "@/lib/auth";
import { getUserSession } from "@/lib/core/getSession";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const classDetails = await getClassById(id);
    return {
      title: `${classDetails?.className || classDetails?.name || "Class Details"} - FlexPulse`,
      description:
        classDetails?.description ||
        "Experience elite training with certified master coaches at FlexPulse.",
    };
  } catch {
    return {
      title: "Class Details - FlexPulse",
    };
  }
}

const ClassDetailsPage = async ({ params }) => {
  const { id } = await params;

  let user = null;
  let token = null;

  try {
    user = await getUserSession();
  } catch (err) {
    console.error("Session fetch error:", err);
  }

  try {
    const tokenObj = await auth.api.getToken({ headers: await headers() });
    token = tokenObj?.token;
  } catch (err) {
    // Guest or no token
  }

  if (!user) {
    redirect(`/signin?redirect=/all-classes/${id}`);
  }

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  let classDetails = null;
  try {
    classDetails = await getClassById(id);
  } catch (err) {
    console.error("Failed to load class details:", err);
  }

  if (!classDetails) {
    notFound();
  }

  let bookingCountData = { bookingCount: classDetails?.bookingCount || 0 };
  if (token) {
    try {
      const bookingCountRes = await fetch(
        `${serverUrl}/api/classBookingCount/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );
      if (bookingCountRes.ok) {
        bookingCountData = await bookingCountRes.json();
      }
    } catch (e) {
      // Fallback to classDetails.bookingCount
    }
  }

  let isBooked = false;
  let isFavorite = false;

  if (user?.id) {
    try {
      const [bookRes, favRes] = await Promise.all([
        fetch(`${serverUrl}/api/checkBooking?userId=${user.id}&classId=${id}`, {
          cache: "no-store",
        }),
        fetch(`${serverUrl}/api/favorites/check?userId=${user.id}&classId=${id}`, {
          cache: "no-store",
        }),
      ]);

      if (bookRes.ok) {
        const data = await bookRes.json();
        isBooked = Boolean(data.isBooked);
      }

      if (favRes.ok) {
        const favoriteData = await favRes.json();
        isFavorite = Boolean(favoriteData.isFavorite);
      }
    } catch (err) {
      console.error("Booking/favorite check error:", err);
    }
  }

  return (
    <ClassDetailsPageLayout
      classData={classDetails}
      isBooked={isBooked}
      isFavorite={isFavorite}
      user={user}
      userId={user?.id}
      userName={user?.name}
      userEmail={user?.email}
      bookingCountData={bookingCountData}
    />
  );
};

export default ClassDetailsPage;
