import { type Venue } from "@prisma/client";

import { db } from "../db";

export async function getVenueByID(id: number): Promise<Venue | null> {
  try {
    const venue = await db.venue.findUnique({
      where: { id },
    });

    return venue;
  } catch (error) {
    console.error(error);

    return null;
  }
}
