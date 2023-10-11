import { getAvailableSeatsByEventID } from "../server/models/Seats";

import SeatsDetails from "./SeatsDetails";

type Props = {
  eventId: number;
};

const Seat = async ({ eventId }: Props) => {
  const seats = await getAvailableSeatsByEventID(eventId);

  if (!seats) {
    return <div>No seats available</div>;
  }

  return <SeatsDetails seats={seats} />;
};

export default Seat;
