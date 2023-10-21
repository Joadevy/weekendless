import { type Reservation } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import z from "zod";

import { createIfNotExists } from "../../../../server/models/Attendees";
import { type ClientReservation } from "../../../../types";
import { create } from "../../../../server/models/Reservation";
import { getUserByEmail } from "../../../../server/models/Users";
import { getEventDetailsBySeatID } from "../../../../server/models/Events";
import { EmailTemplate } from "../../../../components/EmailAttendee";

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

  if (!allowedOrigins.includes(origin) || !origin.includes("weekendless")) {
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

  const eventDetails = await getEventDetailsBySeatID(clientReservation.seatId);

  const attendee = {
    name: clientReservation.attendeeName,
    nationalID: clientReservation.attendeeNationalId,
    phone: clientReservation.attendeePhone,
    email: clientReservation.attendeeEmail,
  };

  const existsAttendee = await createIfNotExists(attendee);

  if (
    !user ||
    !existsAttendee ||
    !eventDetails ||
    eventDetails.seats.length === 0 ||
    !eventDetails.venue
  ) {
    return NextResponse.error();
  }

  const reservation: Pick<
    Reservation,
    "seatId" | "userId" | "attendeeNationalID"
  > = {
    seatId: clientReservation.seatId,
    userId: user.id,
    attendeeNationalID: clientReservation.attendeeNationalId,
  };

  const newReservation = await create(reservation);

  if (!newReservation) {
    return NextResponse.error();
  }

  // Enviar email al attendee email con info del evento y del seat.
  const resend = new Resend(process.env.RESEND_APIKEY);

  try {
    await resend.emails.send({
      // from: "Weekendless <weekendless@joaquinarlettaz.tech>",
      from: "delivered@resend.dev",
      to: "jjoaquinarlettaz@gmail.com",
      // to: attendee.email,
      subject: `Weekendless™ - New reservation on ${eventDetails.name}`,
      text: `Dear ${attendee.name}, here is your ticket for ${eventDetails.name}, the only thing you have to do now is enjoy!`,
      react: EmailTemplate({ attendee, eventDetails }),
    });
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json(newReservation, { headers: corsHeaders });
}
