"use client";
import { type Seat } from "@prisma/client";
import { useState } from "react";

import MakeReservation from "./MakeReservation";

type Props = {
  seats: Seat[];
};

const SeatsDetails = ({ seats }: Props) => {
  const [clientSeats, setClientSeats] = useState(seats);

  const handleReservation = (seatId: number) => {
    const updatedSeats = clientSeats.filter((seat) => seat.id !== seatId);

    setClientSeats(updatedSeats);
  };

  if (clientSeats.length === 0) {
    return <div>No seats available</div>;
  }

  return (
    <>
      <h2>Book your ticket:</h2>
      <ul className="flex flex-col gap-2">
        {clientSeats.map((seat) => (
          <li key={seat.id} className="relative flex h-10 items-center gap-2">
            <p>
              {seat.number} |{" "}
              {seat.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <MakeReservation
              handleReservation={handleReservation}
              seatId={seat.id}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default SeatsDetails;
