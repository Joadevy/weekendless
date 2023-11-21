import { Globe2, Home, MapPinned } from "lucide-react";

import { EventWithVenue } from "../server/models/Events";

import EventParagraph from "./EventParagraph";

type Props = {
  venue: EventWithVenue["venue"];
};

const VenueDetails = async ({ venue }: Props) => {
  if (!venue) return null;

  return (
    <>
      <EventParagraph description={venue.name}>
        <Home size={20} />
      </EventParagraph>
      <EventParagraph description={venue.address}>
        <MapPinned size={20} />
      </EventParagraph>
      <EventParagraph
        description={`${venue.city.name}, ${venue.city.country.name}`}
      >
        <Globe2 size={20} />
      </EventParagraph>
    </>
  );
};

export default VenueDetails;
