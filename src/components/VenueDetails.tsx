import { Home, MapPinned } from "lucide-react";

import { getVenueByID } from "../server/models/Venues";

type Props = {
  venueId: number;
};

const VenueDetails = async ({ venueId }: Props) => {
  const venue = await getVenueByID(venueId);

  if (!venue) return null;

  return (
    <>
      <p className="flex gap-1 items-center">
        <Home size={20} />
        {venue.name}
      </p>
      <p className="flex gap-1 items-center">
        <MapPinned size={20} />
        {venue.address}
      </p>
    </>
  );
};

export default VenueDetails;
