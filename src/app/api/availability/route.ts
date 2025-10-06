import { NextResponse } from "next/server";

import { checkAvailability } from "@/app/(transactions)/reserve/actions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locationSlug = searchParams.get("location");
  const requestedTime = searchParams.get("time");
  const partySize = Number.parseInt(searchParams.get("partySize") ?? "1", 10);

  if (!locationSlug || !requestedTime || Number.isNaN(partySize)) {
    return NextResponse.json({ error: "Missing location, time, or partySize" }, { status: 400 });
  }

  try {
    const result = await checkAvailability({
      locationSlug,
      requestedTime,
      partySize,
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to determine availability";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
