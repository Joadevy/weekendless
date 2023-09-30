import { type Event } from "@prisma/client";
import { db } from "../db";

export async function getEvents(): Promise<Event[] | null> {
  try {
    const events = await db.event.findMany();
    return events;
  } catch (error) {
    console.error(error);
    return null;
  }
}
