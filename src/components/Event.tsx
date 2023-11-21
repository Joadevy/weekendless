import Link from "next/link";

import { EventWithVenue } from "../server/models/Events";
import { getCountryFlag } from "../lib/utils";

import { Separator } from "./ui/separator";
import { buttonVariants } from "./ui/button";

type Props = {
  event: EventWithVenue;
};

const Event = ({ event }: Props) => {
  return (
    <li className="border-lg rounded-lg shadow-md lg:w-96 hover:opacity-75 hover:scale-105 transition-all relative">
      <Link href={`event/${event.id}`}>
        <header className="relative h-48 lg:h-60 w-full overflow-hidden rounded-t-lg object-cover">
          <img
            alt=""
            className="aspect-auto h-full w-full"
            src={event.imageUrl}
          />
        </header>

        <div className="p-4">
          <h2 className="text-xl font-bold">{event.name}</h2>
          <Separator />
          <p className="italic text-slate-600 mb-16">{event.description}</p>
          <div className="flex flex-col absolute bottom-2 text-sm text-slate-600">
            <p>
              {getCountryFlag(event.venue.city.country.name)}{" "}
              {event.venue.city.name}, {event.venue.city.country.name}
            </p>
            <p className={buttonVariants({ variant: "ghost" })}>
              {new Date(event.date).toLocaleString("en-GB", {
                dateStyle: "short",
                timeStyle: "short",
              })}
              hs
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Event;
