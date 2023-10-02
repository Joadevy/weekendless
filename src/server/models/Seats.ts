import { type Reservation } from "@prisma/client";
import { db } from "../db";

export const getSeatsByEventID = async (id: number) => {
  try {
    const Seats = await db.seat.findMany({
      where: { eventId: id },
    });
    return Seats;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setReservation = async (
  seatId: number,
  reservationId: Reservation["id"],
) => {
  try {
    const Seat = await db.seat.update({
      where: { id: seatId },
      data: { reservation: { connect: { id: reservationId } } },
    });
    return Seat;
  } catch (error) {
    console.error(error);
    return null;
  }
};
