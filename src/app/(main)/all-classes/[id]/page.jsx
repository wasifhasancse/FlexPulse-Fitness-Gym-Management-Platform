import ClassDetailsPageLayout from "@/components/AllClasses/ClassDetailsPage";
import { getClassById } from "@/lib/api/getClasses";
import { getUserSession } from "@/lib/core/getSession";
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

  if (!user) {
    redirect(`/signin?redirect=/all-classes/${id}`);
  }

  const classDetails = await getClassById(id);

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
      />
    </div>
  );
};

export default ClassDetailsPage;
