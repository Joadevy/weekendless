import { type Reservation } from "@prisma/client";
import { db } from "../db";

export async function getReservations(): Promise<Reservation[] | null> {
  try {
    const reservations = await db.reservation.findMany();
    return reservations;
  } catch (error) {
    console.error(error);
    return null;
  }
}
