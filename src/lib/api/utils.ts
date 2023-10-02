import { type Event, type Venue } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getEvents = async () => {
  const events = await fetch(`${baseUrl}/events`).then((res) => res.json());
  return events;
};

export const getEventByID = async (id: number) => {
  const event: Event | null = await fetch(`${baseUrl}/event/${id}`).then(
    (res) => res.json(),
  );
  return event;
};

export const getVenueByID = async (id: number) => {
  const venue: Venue | null = await fetch(`${baseUrl}/venue/${id}`).then(
    (res) => res.json(),
  );

  return venue;
};
