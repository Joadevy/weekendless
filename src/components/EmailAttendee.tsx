import type { Attendee } from "@prisma/client";

import { type FC } from "react";

import { type SeatVenueAndEvent } from "../server/models/Events";

interface EmailTemplateProps {
  attendee: Pick<Attendee, "name" | "email" | "nationalID" | "phone">;
  eventDetails: SeatVenueAndEvent;
}

export const EmailTemplate: FC<Readonly<EmailTemplateProps>> = ({
  attendee,
  eventDetails,
}) => (
  <div className="bg-neutral-300 flex flex-col gap-4">
    <h1 className="text-2xl text-cyan-600">
      Are you ready to {eventDetails.name}, {attendee.name}?
    </h1>

    <p>
      We&apos;re expecting you on
      {new Date(eventDetails.date).toLocaleDateString("en-US")} in{" "}
      {eventDetails.venue.name} at {eventDetails.venue.address}!
    </p>

    <div className="flex flex-col gap-2">
      <h2 className="text-xl text-cyan-700">Your seat information:</h2>
      <ul>
        <li>Number: {eventDetails.seats[0].number}</li>
        <li>Value: {eventDetails.seats[0].type.price}</li>
        <li>Description: {eventDetails.seats[0].type.description}</li>
      </ul>
    </div>
  </div>
);
