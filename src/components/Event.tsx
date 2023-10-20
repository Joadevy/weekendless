import Link from "next/link";
import { type Event as event } from "@prisma/client";

type Props = {
  event: event;
};

const Event = ({ event }: Props) => {
  return (
    <li className="border-lg rounded-lg shadow-md lg:w-96 hover:opacity-75 hover:scale-105 transition-all">
      <Link href={`event/${event.id}`}>
        <header className="relative h-48 w-full overflow-hidden rounded-t-lg object-cover">
          <img
            alt=""
            className="aspect-auto h-full w-full"
            src={event.imageUrl}
          />
        </header>

        <div className="p-4">
          <h2 className="text-xl font-bold">{event.name}</h2>
          <p className="italic text-slate-600">{event.description}</p>
        </div>
      </Link>
    </li>
  );
};

export default Event;
