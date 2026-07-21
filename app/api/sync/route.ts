import { NextRequest, NextResponse } from "next/server";
import { saveReminderState } from "@/lib/pushServer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const patch: Record<string, unknown> = {};
    if (typeof body.windowStart === "string") patch.windowStart = body.windowStart;
    if (typeof body.windowEnd === "string") patch.windowEnd = body.windowEnd;
    if (typeof body.timeZone === "string") patch.timeZone = body.timeZone;
    if (typeof body.completedToday === "boolean") patch.completedToday = body.completedToday;
    if (typeof body.dateKey === "string") patch.dateKey = body.dateKey;

    const next = await saveReminderState(patch);
    return NextResponse.json({ ok: true, state: next });
  } catch (e) {
    return NextResponse.json({ error: "Failed to sync state" }, { status: 500 });
  }
}
