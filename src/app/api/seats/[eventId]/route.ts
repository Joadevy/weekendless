import { NextResponse } from "next/server";
import { getAvailableSeatsByEventID } from "~/server/models/Seats";

export async function GET(
  request: Request,
  { params: { eventId } }: { params: { eventId: string } },
) {
  const seats = await getAvailableSeatsByEventID(Number(eventId));
  return NextResponse.json(seats);
}
