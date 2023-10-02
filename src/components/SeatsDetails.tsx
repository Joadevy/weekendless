import { type Seat } from "@prisma/client";

type Props = {
  seats: Seat[];
};

const SeatsDetails = ({ seats }: Props) => {
  return (
    <>
      <h2>Seats</h2>
      <ul>
        {seats.map((seat) => (
          <li key={seat.id}>
            <p>
              {seat.number} - {seat.price}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SeatsDetails;
