import { TypeSeat, type Event, Venue } from "@prisma/client";

import { db } from "../db";

export async function getEvents(): Promise<Event[] | null> {
  try {
    const events = await db.event.findMany();

    return events;
  } catch (error) {
    return null;
  }
}

export async function getEventByID(id: number): Promise<Event | null> {
  try {
    const event = await db.event.findUnique({
      where: { id },
    });

    return event;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function getEventBySeatID(seatId: number): Promise<Event | null> {
  try {
    const event = await db.event.findFirst({
      where: { seats: { some: { id: seatId } } },
    });

    return event;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export type SeatVenueAndEvent = {
  id: number;
  name: string;
  venue: Venue;
  date: Date;
  description: string;
  imageUrl: string;
  seats: {
    id: number;
    number: number;
    type: TypeSeat;
  }[];
};

export async function getEventDetailsBySeatID(
  seatId: number,
): Promise<SeatVenueAndEvent | null> {
  try {
    const eventDetails = await db.event.findFirst({
      where: { seats: { some: { id: seatId } } },
      select: {
        id: true,
        name: true,
        venue: true,
        date: true,
        description: true,
        imageUrl: true,
        seats: {
          where: { id: seatId },
          select: {
            id: true,
            number: true,
            type: true,
          },
        },
      },
    });

    return eventDetails;
  } catch (error) {
    console.error(error);

    return null;
  }
}
