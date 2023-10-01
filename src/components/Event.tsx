import { type Event } from "@prisma/client";

type Props = {
  event: Event;
};

const Event = ({ event }: Props) => {
  return (
    <li className="border-lg rounded-lg  shadow-md">
      <header className="relative h-48 w-full overflow-hidden rounded-t-lg object-cover">
        <img
          src={event.imageUrl}
          alt=""
          className="aspect-auto h-full w-full"
        ></img>
      </header>

      <div className="p-4">
        <h2>{event.name}</h2>
        <p>{event.description}</p>
      </div>
    </li>
  );
};

export default Event;
