import { Reservation } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { getUserIdByEmail } from "../../../../lib/api/utils";
import { createIfNotExists } from "../../../../server/models/Attendees";
import { type ClientReservation } from "../../../../types";
import { create } from "../../../../server/models/Reservation";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  // "https://weekendless.vercel.app/",
  // "https://weekendless.vercel.app",
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin") ?? "";

  if (!allowedOrigins.includes(origin)) {
    return NextResponse.error();
  }

  corsHeaders["Access-Control-Allow-Origin"] = origin;

  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  const clientReservation: ClientReservation = await request.json();
  // Validar los datos de la reserva

  // Armar la entidad reserva y pasarsela al modelo
  const userId = await getUserIdByEmail(clientReservation.userEmail);

  const attendee = {
    name: clientReservation.attendeeName,
    nationalID: clientReservation.attendeeNationalId,
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

  // Pasarla al modelo para que cree la nueva reserva
  const newReservation = await create(reservation);

  return NextResponse.json(newReservation, { headers: corsHeaders });
}
