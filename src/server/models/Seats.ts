import { type Reservation } from "@prisma/client";

import { db } from "../db";

export const getAvailableSeatsByEventID = async (id: number) => {
  try {
    const seats = await db.seat.findMany({
      where: {
        eventId: id,
      },
      select: {
        id: true,
        eventId: true,
        type: true,
        number: true,
        reservations: {
          select: {
            id: true,
            payment: true,
          },
        },
      },
      orderBy: {
        type: {
          price: "asc",
        },
      },
    });

    const availableSeats = seats.filter((seat) => {
      const hasPaymentAssociated = seat.reservations.some(
        (reservation) => reservation.payment !== null,
      );

      return !hasPaymentAssociated;
    });

    return availableSeats;
  } catch (error) {
    console.error(error);
  }
};

export const setReservation = async (
  seatId: number,
  reservationId: Reservation["id"],
) => {
  try {
    const Seat = await db.seat.update({
      where: { id: seatId },
      data: { reservations: { connect: { id: reservationId } } },
    });

    return Seat;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getSeatById = async (id: number) => {
  try {
    const Seat = await db.seat.findUnique({
      where: { id },
    });

    return Seat;
  } catch (error) {
    console.error(error);

    return null;
  }
};
