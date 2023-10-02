import {
  type Seat,
  type Event,
  type Venue,
  type Reservation,
} from "@prisma/client";

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

export const getSeatsByEventID = async (id: number) => {
  const seats: Seat[] | null = await fetch(`${baseUrl}/seats/${id}`).then(
    (res) => res.json(),
  );
  return seats;
};

export const createReservation = async (reservation: Reservation) => {
  const newReservation = await fetch(`${baseUrl}/seat/reserve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservation),
  }).then((res) => res.json());

  return newReservation;
};
