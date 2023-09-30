import { type Event } from "@prisma/client";
import { getEvents } from "~/lib/api/utils";

export default async function Home() {
  const events: Event[] = await getEvents();

  console.log(events);
  return (
    <main className="flex w-full items-center justify-center p-2">
      <header>
        <h1 className="text-5xl font-extrabold text-gray-800">WEEKENDLESS</h1>
      </header>

      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
