import { type Event } from "@prisma/client";

import VenueDetails from "./VenueDetails";
import Seat from "./Seat";

type Props = {
  event: Event;
};

const EventDetails = ({ event }: Props) => {
  return (
    <div className="border-lg rounded-lg shadow-md">
      <header className="relative h-48 w-full overflow-hidden rounded-t-lg object-cover">
        <img
          alt=""
          className="aspect-auto h-full w-full"
          src={event.imageUrl}
        />
      </header>

      <div className="flex flex-col gap-2 p-4">
        <section>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
          <p>{new Date(event.date).toLocaleDateString("en")}</p>
        </section>

        <section className="">
          <VenueDetails venueId={event.venueId} />
        </section>

        <section className="">
          <Seat eventId={event.id} />
        </section>
      </div>
    </div>
  );
};

export default EventDetails;
