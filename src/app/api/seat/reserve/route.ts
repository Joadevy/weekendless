import { type Reservation } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

import { createIfNotExists } from "../../../../server/models/Attendees";
import { type ClientReservation } from "../../../../types";
import { create } from "../../../../server/models/Reservation";
import { getUserByEmail } from "../../../../server/models/Users";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://weekendless.vercel.app/",
  "https://weekendless.vercel.app",
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
  const inputReservation: ClientReservation = await request.json();
  // Validar los datos de la reserva con zod
  const schema = z.object({
    userEmail: z.string().email(),
    attendeeName: z.string(),
    attendeeNationalId: z.string(),
    attendeePhone: z.string(),
    attendeeEmail: z.string().email(),
    seatId: z.number(),
  });

  const inputReservationValidated = schema.safeParse(inputReservation);

  if (!inputReservationValidated.success) {
    return NextResponse.error();
  }

  const clientReservation = inputReservationValidated.data;

  // Armar la entidad reserva y pasarsela al modelo
  const user = await getUserByEmail(clientReservation.userEmail);

  if (!user) {
    return NextResponse.error();
  }

  const attendee = {
    name: clientReservation.attendeeName,
    nationalID: clientReservation.attendeeNationalId,
    phone: clientReservation.attendeePhone,
    email: clientReservation.attendeeEmail,
  };

  const reservation: Pick<
    Reservation,
    "seatId" | "userId" | "attendeeNationalID"
  > = {
    seatId: clientReservation.seatId,
    userId: user.id,
    attendeeNationalID: clientReservation.attendeeNationalId,
  };

  const createAttendee = createIfNotExists(attendee);
  const createReservation = create(reservation);

  const [newReservation] = await Promise.all([
    createReservation,
    createAttendee,
  ]);

  if (!newReservation) {
    return NextResponse.error();
  }

  return NextResponse.json(newReservation, { headers: corsHeaders });
}
