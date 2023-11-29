"use client";

import { type TypeSeat } from "@prisma/client";

import MakeReservation from "./MakeReservation";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Separator } from "./ui/separator";

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
  if (!seats || seats.length === 0) {
    return <p className="text-slate-400 italic">No tickets available</p>;
  }

  return (
    <>
      <ul className="flex gap-2 lg:gap-4 flex-wrap overflow-y-auto h-[300px] lg:h-auto">
        {seats.map((seat) => (
          <li
            key={seat.id}
            className="flex gap-1 items-center p-2 h-fit min-h-[50px] rounded-md transition-all border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            <HoverCard>
              <HoverCardTrigger className="flex flex-col justify-center items-center gap-1">
                <HoverCardContent>{seat.type.description}</HoverCardContent>
                <div className="flex h-5 items-center space-x-2">
                  <p>
                    Ticket <span className="font-bold">{seat.number}</span>
                  </p>

                  <Separator orientation="vertical" />

                  <p>
                    {seat.type.price.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                  </p>
                </div>

                <Separator />

                <MakeReservation seat={seat} />
              </HoverCardTrigger>
            </HoverCard>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SeatsDetails;
