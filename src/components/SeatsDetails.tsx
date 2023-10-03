"use client";
import { type Seat } from "@prisma/client";
import MakeReservation from "./MakeReservation";

type Props = {
  seats: Seat[];
};

const SeatsDetails = ({ seats }: Props) => {
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
            <MakeReservation seatId={seat.id} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default SeatsDetails;
