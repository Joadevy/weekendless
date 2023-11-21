import EventDetails from "../../../components/EventDetails";
import { getEventByID } from "../../../server/models/Events";

export const revalidate = 60; // change when no dev environment

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const eventID = Number(id);
  const event = await getEventByID(eventID);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <>
      <main className="flex w-full flex-col items-center justify-center gap-4 px-2 py-3 pt-14">
        <EventDetails event={event} />
      </main>
    </>
  );
};

export default Page;
