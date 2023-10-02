import EventDetails from "~/components/EventDetails";
import { getEventByID } from "~/lib/api/utils";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const eventID = Number(id);
  const event = await getEventByID(eventID);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <main className="flex w-full flex-col items-center justify-center gap-4 px-2 py-3">
      <EventDetails event={event} />
    </main>
  );
};

export default Page;
