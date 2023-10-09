import { Event as event } from "@prisma/client";

import Event from "../components/Event";
import Navbar from "../components/auth/Navbar";
import { getEvents } from "../lib/api/utils";

export const revalidate = 3600; // change when no dev environment
const getBaseURL = () => {
  return process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
    : `${process.env.NEXT_PUBLIC_API_URL}`;
};

export default async function Home() {
  const baseUrl = getBaseURL();
  const events: event[] = await fetch(`${baseUrl}/events`).then((res) =>
    res.json(),
  );

  return (
    <>
      <Navbar />
      <main className="flex w-full flex-col items-center justify-center gap-4 px-2 py-3">
        <header>
          <h1 className="text-5xl font-extrabold text-gray-800">WEEKENDLESS</h1>
        </header>

        <ul className="flex flex-col gap-2">
          {events.map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </ul>
      </main>
    </>
  );
}
