import Link from "next/link";
import Image from "next/image";

import { getEvents } from "../server/models/Events";
import { getCountryFlag } from "../lib/utils";

import { Badge } from "./ui/badge";

export async function Carousel() {
  const products = await getEvents();

  if (!products?.length) return null;

  const carouselEvents = [...products, ...products, ...products];

  return (
    <div className=" w-full overflow-x-auto pb-6 lg:pb-3 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselEvents.map((event, i) => (
          <li
            key={`${event.id}${i}`}
            className="relative aspect-square h-[35vh] max-h-[350px] w-10/12 lg:w-2/3 max-w-[475px] flex-none md:w-1/3 border rounded-md shadow-lg overflow-hidden"
          >
            <Link className="h-full w-full" href={`/event/${event.id}`}>
              <Image
                fill
                alt={event.name}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                src={event.imageUrl}
              />
              <footer className="absolute bottom-0 left-0 w-full lg:w-8/12 p-2 opacity-80 bg-gray-200 flex flex-col gap-1">
                <header className="flex gap-2 items-center justify-between">
                  <h2 className="font-bold text-md">{event.name}</h2>
                  <Badge>{event.type.name}</Badge>
                </header>
                <p>{`${getCountryFlag(event.venue.city.country.name)} ${
                  event.venue.city.name
                }, ${event.venue.city.country.name}`}</p>
              </footer>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
