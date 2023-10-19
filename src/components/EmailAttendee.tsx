import type { Attendee, Event, Seat, Venue } from "@prisma/client";

import { type FC } from "react";

interface EmailTemplateProps {
  attendee: Pick<Attendee, "name" | "email" | "nationalID" | "phone">;
  event: Event;
  seat: Seat;
  venue: Venue;
}

export const EmailTemplate: FC<Readonly<EmailTemplateProps>> = ({
  attendee,
  event,
  seat,
  venue,
}) => (
  <div className="bg-neutral-300 flex flex-col gap-4">
    <h1 className="text-2xl text-cyan-600">
      Are you ready to {event.name}, {attendee.name}?
    </h1>

    <p>
      We&apos;re expecting you on
      {new Date(event.date).toLocaleDateString("en-US")} in {venue.name} at{" "}
      {venue.address}!
    </p>

    <div className="flex flex-col gap-2">
      <h2 className="text-xl text-cyan-700">Your seat information:</h2>
      <ul>
        <li>Number: {seat.number}</li>
        <li>Value: {seat.price}</li>
        <li>Description: {seat.description}</li>
      </ul>
    </div>
  </div>
);
