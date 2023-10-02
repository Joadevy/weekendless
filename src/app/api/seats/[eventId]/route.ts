import { NextResponse } from "next/server";
import { getSeatsByEventID } from "~/server/models/Seats";

export async function GET(
  request: Request,
  { params: { eventId } }: { params: { eventId: string } },
) {
  const seats = await getSeatsByEventID(Number(eventId));
  return NextResponse.json(seats);
}
