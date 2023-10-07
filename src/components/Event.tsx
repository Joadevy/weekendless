import Link from "next/link";
import { type Event as event } from "@prisma/client";

type Props = {
  event: event;
};

const Event = ({ event }: Props) => {
  return (
    <li className="border-lg rounded-lg  shadow-md">
      <Link href={`event/${event.id}`}>
        <header className="relative h-48 w-full overflow-hidden rounded-t-lg object-cover">
          <img
            alt=""
            className="aspect-auto h-full w-full"
            src={event.imageUrl}
          />
        </header>

        <div className="p-4">
          <h2>{event.name}</h2>
          <p>{event.description}</p>
        </div>
      </Link>
    </li>
  );
};

export default Event;
