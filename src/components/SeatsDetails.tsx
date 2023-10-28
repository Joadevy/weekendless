"use client";

import { useState } from "react";
import { type TypeSeat } from "@prisma/client";

import MakeReservation from "./MakeReservation";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export type Seat = {
  id: number;
  number: number;
  eventId: number;
  type: TypeSeat;
};

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
          <li key={seat.id} className="bg-slate-100 p-2 rounded-sm shadow-sm">
            <HoverCard>
              <HoverCardTrigger className="relative flex flex-col justify-center items-center">
                <HoverCardContent>{seat.type.description}</HoverCardContent>
                <p>
                  {seat.number} |{" "}
                  {seat.type.price.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </p>
                <MakeReservation
                  handleReservation={handleReservation}
                  seat={seat}
                />
              </HoverCardTrigger>
            </HoverCard>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SeatsDetails;
