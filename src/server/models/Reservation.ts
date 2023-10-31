import { Payment, type Reservation } from "@prisma/client";

import { db } from "../db";
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

    try {
      await handleSendEmail(
        Reservation.attendee.email,
        `Weekendless™ - New reservation on ${Reservation.seat.event.name}`,
        `
       <table style="width: 100%;">
        <tr>
          <td style="padding: 5px;">
            <h1 style="font-size:32px;font-weight:bold;margin:1px 0;padding:0;">Dear ${
              Reservation.attendee.name
            }, here is your ticket for ${Reservation.seat.event.name}<!</h1>
            <p style="font-size:18px;margin:1px 0;padding:0;">The only thing you have to do now is enjoy!</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 5px;">
            <h2 style="font-size: 20px;margin:1px 0;padding:0;">Here is your ticket:</h2>
            <ul style="margin:1px 0;padding:0;">
              <li>Number: <strong>${Reservation.seat.number}</strong></li>
              <li>Value: <strong>$${Reservation.seat.type.price}</strong></li>
              <li>Description: <strong>${
                Reservation.seat.type.description
              }</strong></li>
            </ul>
          </td>
        </tr>
        <tr>
          <td style="padding: 5px;">
            <h2 style="margin:1px 0;padding:0;">Event details</h2>
            <p style="margin:1px 0;padding:0;">
              We're expecting you on
              <strong>${new Date(
                Reservation.seat.event.date,
              ).toLocaleDateString("en-US")}</strong> in <strong>${
                Reservation.seat.event.venue.name
              }</strong> at <strong>${
                Reservation.seat.event.venue.address
              }</strong>!
            </p>
          </td>
        </tr>
      </table>
         `,
      );
    } catch (error) {
      console.error(error);
    }

    return Reservation;
  } catch (error) {
    console.error(error);

    return null;
  }
};
