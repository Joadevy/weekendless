import { getAvailableSeatsByEventID } from "../server/models/Seats";

import SeatsDetails from "./SeatsDetails";

type Props = {
  eventId: number;
};

const Seat = async ({ eventId }: Props) => {
  const seats = await getAvailableSeatsByEventID(eventId);

  if (!seats || seats.length === 0) {
    return <p className="text-slate-400 italic">No tickets available</p>;
  }

  return <SeatsDetails seats={seats} />;
};

export default Seat;
