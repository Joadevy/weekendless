import { NextResponse } from "next/server";
import { getEventByID } from "~/server/models/Events";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  console.log("hola");
  const eventID = Number(params.id);
  const event = await getEventByID(eventID);
  return NextResponse.json(event);
}
