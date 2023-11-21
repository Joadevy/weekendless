import { TypeSeat, type Event, Venue, Prisma } from "@prisma/client";

import { db } from "../db";

export type EventWithVenue = Prisma.EventGetPayload<{
  include: {
    venue: {
      include: {
        city: {
          include: { country: true };
        };
      };
    };
  };
}>;

export async function getEvents(): Promise<EventWithVenue[] | null> {
  try {
    const events = await db.event.findMany({
      include: {
        venue: {
          include: {
            city: {
              include: { country: true },
            },
          },
        },
      },
      orderBy: { date: "asc" },
    });

    return events;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function getEventByID(id: number): Promise<EventWithVenue | null> {
  try {
    const event = await db.event.findUnique({
      where: { id },
      include: {
        venue: {
          include: {
            city: {
              include: { country: true },
            },
          },
        },
      },
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
