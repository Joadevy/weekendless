import { NextResponse } from "next/server";
import { create } from "~/server/models/Reservation";

export async function POST(request: Request) {
  const reservation = await request.json();
  console.log(reservation); // La reservation esta llegando correctamente
  // const mewReservation = await create(reservation);
  return NextResponse.json(reservation);
}
