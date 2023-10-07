import { getVenueByID } from "../lib/api/utils";

type Props = {
  venueId: number;
};

const VenueDetails = async ({ venueId }: Props) => {
  const venue = await getVenueByID(venueId);

  if (!venue) return null;

  return (
    <>
      <h2>{venue.name}</h2>
      <p>{venue.address}</p>
    </>
  );
};

export default VenueDetails;
