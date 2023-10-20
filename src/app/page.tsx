import { Event as event } from "@prisma/client";
import Image from "next/image";

import Event from "../components/Event";
import Navbar from "../components/auth/Navbar";
import { getEvents } from "../server/models/Events";
import Wimage from "../public/Warwick_W_logo (1).png";

export const revalidate = 3600 * 24; // change when no dev environment

export default async function Home() {
  const events: event[] | null = await getEvents();

  if (!events) return <div>There are no events yet :c</div>;

  return (
    <>
      <Navbar />
      <main className="flex w-full flex-col items-center justify-center gap-4 px-2 py-3">
        <header className="text-center flex flex-col items-center">
          <div className="flex items-center">
            <div className=" h-24 w-24 relative">
              <Image fill alt="" src={Wimage} />
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

        <ul className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:gap-4">
          {events.map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </ul>
      </main>
    </>
  );
}
