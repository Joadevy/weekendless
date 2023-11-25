import Image from "next/image";

import Event from "../components/Event";
import { getEvents } from "../server/models/Events";
import Wimage from "../public/Warwick_W_logo (1).png";
import { FilterSelect } from "../components/FilterSelect";
import { FilterInput } from "../components/FilterInput";
import { getAllTypeEventNames } from "../server/models/TypeEvents";
import { getAllCountryNames } from "../server/models/Countries";

export const revalidate = 3600 * 24; // change when no dev environment

export default async function Home({ searchParams }: { searchParams: any }) {
  const { country, eventName, typeEvent } = searchParams;
  const typeEvents = getAllTypeEventNames();
  const countries = getAllCountryNames();

  const [typeEventOptions, countryOptions] = await Promise.all([
    typeEvents,
    countries,
  ]);

  const events = await getEvents(
    country ? country : undefined,
    eventName ? eventName : undefined,
    typeEvent ? typeEvent : undefined,
  );

  if (!events)
    return (
      <div className="text-center text-slate-400 italic">
        There are no events yet :c
      </div>
    );

  return (
    <>
      <main className="flex w-full flex-col items-center justify-center gap-4 px-2 py-3 pt-14">
        <header className="text-center flex flex-col items-center">
          <div className="flex items-center">
            <div className=" h-24 w-24 relative">
              <Image fill alt="" sizes="5vw" src={Wimage} />
            </div>
            <h1 className=" -ml-5 text-5xl font-extrabold text-gray-800">
              EEKENDLESS!
            </h1>
          </div>
          <p className=" text-slate-600 italic text-center -mt-5">
            Book your tickets for your favorite events, the only thing left is
            to enjoy
          </p>
        </header>

        <section className="flex items-center justify-around gap-4">
          <FilterInput placeholder="Filter by name" queryParam="eventName" />

          <FilterSelect
            label="Event country"
            options={["All", ...countryOptions]} // Replace with database countries
            placeholder="Filter by country"
            queryParam="country"
          />

          <FilterSelect
            label="Event type"
            options={["All", ...typeEventOptions]} // Replace with database event types
            placeholder="Filter by type"
            queryParam="typeEvent"
          />
        </section>

        {events.length > 0 ? (
          <ul className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:gap-4">
            {events.map((event) => (
              <Event key={event.id} event={event} />
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 italic">
            There are no events that match to the current filters...
          </p>
        )}
      </main>
    </>
  );
}
