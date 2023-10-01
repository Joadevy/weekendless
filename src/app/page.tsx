import Event from "~/components/Event";
import { getEvents } from "~/lib/api/utils";

export const revalidate = 10; // change when no dev environment

export default async function Home() {
  const events: Event[] = await getEvents();
  return (
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
  );
}
