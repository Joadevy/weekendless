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
    return <p className="text-slate-400 italic">No seats available</p>;
  }

  return (
    <>
      <h2>Book your ticket:</h2>
      <ul className="flex gap-4 flex-wrap mt-1">
        {clientSeats.map((seat) => (
          <li
            key={seat.id}
            className="relative flex flex-col justify-center items-center bg-slate-100 p-2 rounded-sm shadow-sm"
          >
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
