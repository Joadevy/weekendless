import { Home, MapPinned } from "lucide-react";

import { getVenueByID } from "../server/models/Venues";

import EventParagraph from "./EventParagraph";

type Props = {
  venueId: number;
};

const VenueDetails = async ({ venueId }: Props) => {
  const venue = await getVenueByID(venueId);

  if (!venue) return null;

  return (
    <>
      <EventParagraph description={venue.name}>
        <Home size={20} />
      </EventParagraph>
      <EventParagraph description={venue.address}>
        <MapPinned size={20} />
      </EventParagraph>
    </>
  );
};

export default VenueDetails;
