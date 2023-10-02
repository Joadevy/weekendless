"use client";
import { type Reservation, type Seat } from "@prisma/client";
import { useSession } from "next-auth/react";
import { createReservation } from "~/lib/api/utils";

type Props = {
  seats: Seat[];
};

const SeatsDetails = ({ seats }: Props) => {
  const { data: session } = useSession();

  const handleNewReservation = async (seatId: number) => {
    if (!session?.user) return;

    const newReservation: Reservation = {
      seatId,
      attendeeId: 1,
      // userId: session?.user?.email,
      userId: "1",
    };

    await createReservation(newReservation);
  };

  return (
    <>
      <h2>Seats</h2>
      <ul>
        {seats.map((seat) => (
          <li key={seat.id}>
            <p>
              {seat.number} - {seat.price}
            </p>
            <button onClick={() => handleNewReservation(seat.id)}>
              Reserve
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SeatsDetails;
