import { type Event } from "@prisma/client";
import VenueDetails from "./VenueDetails";

type Props = {
  event: Event;
};

const EventDetails = ({ event }: Props) => {
  return (
    <div className="border-lg rounded-lg shadow-md">
      <header className="relative h-48 w-full overflow-hidden rounded-t-lg object-cover">
        <img
          src={event.imageUrl}
          alt=""
          className="aspect-auto h-full w-full"
        ></img>
      </header>

      <div className="p-4">
        <h2>{event.name}</h2>
        <p>{event.description}</p>
        <p>{new Date(event.date).toLocaleDateString("en")}</p>

        <div className="mt-2">
          <VenueDetails venueId={event.venueId} />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
