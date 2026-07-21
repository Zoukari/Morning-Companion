import { NextRequest, NextResponse } from "next/server";
import { saveSubscription } from "@/lib/pushServer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || !body.endpoint) {
      return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
    }
    await saveSubscription(body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to save subscription" }, { status: 500 });
  }
}
