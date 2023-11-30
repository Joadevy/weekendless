import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { authOptions } from "../api/auth/[...nextauth]/route";
import {
  ReservationsFullInfo,
  getReservationOfUser,
} from "../../server/models/Reservation";
import { buttonVariants } from "../../components/ui/button";

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
      <div className="text-center text-slate-400 italic pt-16 px-5 flex flex-col gap-1 items-center">
        There are no reservations yet, let&apos;s book some!
        <Link
          className={buttonVariants({ variant: "default" }) + " w-fit"}
          href={"/"}
        >
          Search events
        </Link>
      </div>
    );
  }

  return (
    <div className="px-5 pt-16">
      <h1 className="text-lg lg:text-2xl font-bold mb-2">My reservations</h1>
      <ul className="flex flex-wrap gap-2 lg:gap-4">
        {reservations.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </ul>
    </div>
  );
};

export default page;
