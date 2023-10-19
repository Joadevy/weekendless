import { type Reservation } from "@prisma/client";

import { db } from "../db";

import { setReservation } from "./Seats";

export async function getReservations(): Promise<Reservation[] | null> {
  try {
    const reservations = await db.reservation.findMany();

    return reservations;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function create(
  reservation: Pick<Reservation, "seatId" | "userId" | "attendeeNationalID">,
): Promise<Reservation | null> {
  try {
    const newReservation = await db.reservation.create({
      data: reservation,
    });

    await setReservation(reservation.seatId, newReservation.id);

    return newReservation;
  } catch (error) {
    console.error(error);

    return null;
  }
}
