import React from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../../../components/ui/card";
import { ReservationsFullInfo } from "../../../server/models/Reservation";
import { Separator } from "../../../components/ui/separator";
import { buttonVariants } from "../../../components/ui/button";
import { getCountryFlag } from "../../../lib/utils";

type Iprops = {
  reservation: ReservationsFullInfo;
};

const ReservationCard = ({ reservation }: Iprops) => {
  return (
    <Card className="py-2 w-[250px] h-[275px] lg:w-[300px] relative">
      <CardContent>
        <CardTitle className="mb-1">{reservation.seat.event.name}</CardTitle>
        <Separator />

        <ul className="flex flex-col text-base mt-3">
          <li>
            By <span className="font-bold"> {reservation.attendee.name}</span>,{" "}
            {reservation.attendee.email}
          </li>

          <li>
            Ticket <span className="font-bold">{reservation.seat.number}</span>
          </li>

          <li>
            {reservation.seat.event.venue.name},{" "}
            {reservation.seat.event.venue.address}
          </li>

          <li className="flex gap-1 items-center">
            <span>
              {getCountryFlag(reservation.seat.event.venue.city.country.name)}
            </span>
            <span>{reservation.seat.event.venue.city.name}</span>
          </li>

          <li>
            {new Date(reservation.seat.event.date).toLocaleString("en-GB", {
              dateStyle: "short",
              timeStyle: "short",
            })}
            hs
          </li>
        </ul>
      </CardContent>

      <CardFooter className="absolute bottom-0">
        <Link
          className={buttonVariants({ variant: "default" })}
          href={`/event/${reservation.seat.event.id}`}
        >
          Event Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ReservationCard;
