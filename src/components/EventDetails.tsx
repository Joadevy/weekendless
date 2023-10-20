import { type Event } from "@prisma/client";

import VenueDetails from "./VenueDetails";
import Seat from "./Seat";

type Props = {
  event: Event;
};

const EventDetails = ({ event }: Props) => {
  return (
    <div className="border-lg rounded-lg shadow-lg">
      <header className="relative h-48 lg:h-64 w-full overflow-hidden rounded-t-lg object-cover">
        <img
          alt=""
          className="aspect-auto h-full w-full"
          src={event.imageUrl}
        />
      </header>

      <div className="flex flex-col gap-4 p-4">
        <section>
          <header className="flex gap-2 items-center justify-between">
            <h2 className="text-xl font-bold">{event.name}</h2>
            <p className="bg-black w-fit text-white p-1 rounded-md">
              {new Date(event.date).toLocaleDateString("en")}
            </p>
          </header>
          <p className="italic text-slate-600">{event.description}</p>
        </section>

        <section className="">
          <VenueDetails venueId={event.venueId} />
        </section>

        <section className="mt-2">
          <Seat eventId={event.id} />
        </section>
      </div>
    </div>
  );
};

export default EventDetails;
