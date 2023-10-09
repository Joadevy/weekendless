import { NextResponse } from "next/server";

import { getEvents } from "../../../server/models/Events";

export async function GET() {
  const events = await getEvents();

  console.log("events en el route handler ", events);

  return NextResponse.json(events);
}
