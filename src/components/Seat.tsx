import { EventWithVenue } from "../server/models/Events";
import { getAvailableSeatsByEventID } from "../server/models/Seats";

import SeatsDetails from "./SeatsDetails";

type Props = {
  event: EventWithVenue;
};

const Seats = async ({ event }: Props) => {
  const seats = await getAvailableSeatsByEventID(event.id);

  if (!seats || seats.length === 0) {
    return <p className="text-slate-400 italic">No tickets available</p>;
  }

  return <SeatsDetails event={event} seats={seats} />;
};

export default Seats;
