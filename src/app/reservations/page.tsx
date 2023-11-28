import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "../api/auth/[...nextauth]/route";
import {
  ReservationsFullInfo,
  getReservationOfUser,
} from "../../server/models/Reservation";

import ReservationCard from "./components/ReservationCard";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const reservations: ReservationsFullInfo[] = await getReservationOfUser(
    session.user?.email!,
  );

  if (!reservations.length) {
    return (
      <div className="text-center text-slate-400 italic">
        There are no reservations yet, let&apos;s book some!
      </div>
    );
  }

  return (
    <main className="px-5 pt-20">
      <h1 className="text-lg lg:text-2xl font-bold mb-2">My reservations</h1>
      <ul className="flex flex-wrap gap-2">
        {reservations.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </ul>
    </main>
  );
};

export default page;
