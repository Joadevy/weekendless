import EventDetails from "../../../components/EventDetails";
import { getEventByID } from "../../../server/models/Events";
import { Carousel } from "../../../components/Carousel";

export const revalidate = 60; // change when no dev environment

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const eventID = Number(id);
  const event = await getEventByID(eventID);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-10 px-2 py-3 pt-14">
        <EventDetails event={event} />

        <Carousel />
      </div>
    </>
  );
};

export default Page;
