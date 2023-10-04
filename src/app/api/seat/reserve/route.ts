import { type Reservation } from "@prisma/client";
import { NextResponse } from "next/server";
import { getUserIdByEmail } from "~/lib/api/utils";
import { create } from "~/server/models/Reservation";
import { createIfNotExists } from "~/server/models/Attendees";

import { type ClientReservation } from "~/types";

export async function POST(request: Request) {
  const clientReservation: ClientReservation = await request.json();
  // Validar los datos de la reserva

  // Armar la entidad reserva y pasarsela al modelo
  const userId = await getUserIdByEmail(clientReservation.userEmail);

  const attendee = {
    name: clientReservation.attendeeName,
    nationalId: clientReservation.attendeeNationalId,
    phone: clientReservation.attendeePhone,
    email: clientReservation.attendeeEmail,
  };

  const existsAttendee = await createIfNotExists(attendee);

  if (!userId || !existsAttendee) {
    return NextResponse.error();
  }

  const reservation: Pick<
    Reservation,
    "seatId" | "userId" | "attendeeNationalID"
  > = {
    seatId: clientReservation.seatId,
    userId,
    attendeeNationalID: clientReservation.attendeeNationalId,
  };

  console.log(reservation);

  // Pasarla al modelo para que cree la nueva reserva
  // const newReservation = await create(reservation);
  // return NextResponse.json(newReservation);
  return NextResponse.json(reservation);
}
