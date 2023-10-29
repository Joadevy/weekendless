import { Payment, type Reservation } from "@prisma/client";

import { db } from "../db";
import { EmailTemplate } from "../../components/EmailAttendee";
import handleSendEmail from "../nodemail/nodemail";

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

export const setPayment = async (
  reservationId: Reservation["id"],
  payment: Pick<Payment, "preferenceId" | "id">,
) => {
  try {
    const Reservation = await db.reservation.update({
      where: { id: reservationId },
      data: { payment: { create: payment } },
      select: {
        payment: true,
        attendee: {
          select: {
            name: true,
            email: true,
          },
        },
        seatId: true,
        userId: true,
        seat: {
          select: {
            number: true,
            type: true,
            event: {
              select: {
                name: true,
                date: true,
                venue: {
                  select: {
                    name: true,
                    address: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    await handleSendEmail(
      Reservation.attendee.email,
      `Weekendless™ - New reservation on ${Reservation.seat.event.name}`,
      `Dear ${Reservation.attendee.name}, here is your ticket for ${Reservation.seat.event.name}, the only thing you have to do now is enjoy!`,
    );

    return Reservation;
  } catch (error) {
    console.error(error);

    return null;
  }
};
