"use client";
import { type Reservation, type Seat } from "@prisma/client";
import { useSession } from "next-auth/react";
import { createReservation } from "~/lib/api/utils";
import { Button } from "./ui/button";

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
      <ul className="flex flex-col gap-2">
        {seats.map((seat) => (
          <li key={seat.id} className="flex items-center gap-2">
            <p>
              {seat.number} |{" "}
              {seat.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <Button onClick={() => handleNewReservation(seat.id)}>
              Reserve
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SeatsDetails;
