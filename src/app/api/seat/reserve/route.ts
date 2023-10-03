import { type Reservation } from "@prisma/client";
import { NextResponse } from "next/server";
import { getUserIdByEmail } from "~/lib/api/utils";
import { create } from "~/server/models/Reservation";
import { type ClientReservation } from "~/types";

export async function POST(request: Request) {
  const clientReservation: ClientReservation = await request.json();
  // Validar los datos de la reserva

  // Armar la entidad reserva y pasarsela al modelo
  const userId = await getUserIdByEmail(clientReservation.userEmail);

  console.log(userId);

  if (!userId) {
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
  // const mewReservation = await create(reservation);
  return NextResponse.json({});
  // return NextResponse.json(reservation);
}
