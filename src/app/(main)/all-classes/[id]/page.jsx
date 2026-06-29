import ClassDetailsPageLayout from "@/components/AllClasses/ClassDetailsPage";
import { getClassById } from "@/lib/api/getClasses";
import { auth } from "@/lib/auth";
import { getUserSession } from "@/lib/core/getSession";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const classDetails = await getClassById(id);
    return {
      title: classDetails?.name || "Class Details",
    };
  } catch {
    return {
      title: "Class Details",
    };
  }
}

const ClassDetailsPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();
  const { token } = await auth.api.getToken({ headers: await headers() });


  if (!user) {
    redirect(`/signin?redirect=/all-classes/${id}`);
  }

// app.get('/api/classBookingCount/:id', verifyToken, async (req, res) => {
//       const { id } = req.params;
//       const classDoc = await bookingClassCollection.find({
//         classId: id,
//       });
//       const bookingCount = await classDoc.count();
//       res.send({ bookingCount: bookingCount || 0 });
  //     });
  // get the booking count for the class

  const bookingCountRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/classBookingCount/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const bookingCountData = await bookingCountRes.json();

  const classDetails = await getClassById(id);

  console.log("Class details:", classDetails); // Debugging line to check the fetched class details

  let isBooked = false;
  let isFavorite = false;

  if (user?.id) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/checkBooking?userId=${user.id}&classId=${id}`,
    );
    const data = await res.json();
    isBooked = data.isBooked;

    const favoriteRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/favorites/check?userId=${user.id}&classId=${id}`,
    );
    const favoriteData = await favoriteRes.json();
    isFavorite = favoriteData.isFavorite;
  }
  return (
    <div>
      <ClassDetailsPageLayout
        classData={classDetails}
        isBooked={isBooked}
        isFavorite={isFavorite}
        userId={user?.id}
        userName={user?.name}
        userEmail={user?.email}
        bookingCountData={bookingCountData}
      />
    </div>
  );
};

export default ClassDetailsPage;
