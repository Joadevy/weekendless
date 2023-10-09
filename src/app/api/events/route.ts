import { NextResponse } from "next/server";

import { getEvents } from "../../../server/models/Events";

export async function GET() {
  const events = await getEvents();

  return NextResponse.json(events);
}
