import { NextResponse } from "next/server";
import { getVenueByID } from "~/server/models/Venues";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const venueID = Number(params.id);
  const venue = await getVenueByID(venueID);
  return NextResponse.json(venue);
}
