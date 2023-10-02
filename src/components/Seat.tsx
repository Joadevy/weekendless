import { getSeatsByEventID } from "~/lib/api/utils";
import SeatsDetails from "./SeatsDetails";

type Props = {
  eventId: number;
};

const Seat = async ({ eventId }: Props) => {
  const seats = await getSeatsByEventID(eventId);

  if (!seats) {
    return <div>No seats available</div>;
  }

  return <SeatsDetails seats={seats} />;
};

export default Seat;
