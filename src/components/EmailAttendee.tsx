import type { Attendee, Event, Seat, TypeSeat, Venue } from "@prisma/client";

import { type FC } from "react";

interface EmailTemplateProps {
  attendee: Pick<Attendee, "name" | "email">;
  eventDetails: Pick<Event, "name" | "date">;
  venueDetails: Pick<Venue, "name" | "address">;
  seatDetails: Pick<TypeSeat, "description" | "price">;
  seat: Pick<Seat, "number">;
}

export const EmailTemplate: FC<Readonly<EmailTemplateProps>> = ({
  attendee,
  eventDetails,
  venueDetails,
  seatDetails,
  seat,
}) => (
  <div className="bg-neutral-300 flex flex-col gap-4">
    <h1 className="text-2xl text-cyan-600">
      Are you ready to {eventDetails.name}, {attendee.name}?
    </h1>

    <p>
      We&apos;re expecting you on
      {new Date(eventDetails.date).toLocaleDateString("en-US")} in{" "}
      {venueDetails.name} at {venueDetails.address}!
    </p>

    <div className="flex flex-col gap-2">
      <h2 className="text-xl text-cyan-700">Your seat information:</h2>
      <ul>
        <li>Number: {seat.number}</li>
        <li>Value: {seatDetails.price}</li>
        <li>Description: {seatDetails.description}</li>
      </ul>
    </div>
  </div>
);
