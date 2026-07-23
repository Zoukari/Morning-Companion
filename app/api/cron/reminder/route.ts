import { NextRequest, NextResponse } from "next/server";
import {
  ensureVapid, getReminderState, getSubscription, isWithinWindow,
  kv, nowInTimeZone, saveReminderState, webpush,
} from "@/lib/pushServer";

const THROTTLE_MS = 20 * 60 * 1000; // don't re-notify more often than every 20 minutes

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subscription = await getSubscription();
  if (!subscription) {
    return NextResponse.json({ skipped: "no-subscription" });
  }

  const state = await getReminderState();
  const { dateKey: currentDateKey, hhmm } = nowInTimeZone(state.timeZone);

  // New day (server-side) rolled over before the client had a chance to sync — reset locally.
  const rolledOver = currentDateKey !== state.dateKey;
  const completedToday = rolledOver ? false : state.completedToday;

  if (completedToday) {
    if (rolledOver) await saveReminderState({ dateKey: currentDateKey, completedToday: false });
    return NextResponse.json({ skipped: "already-completed" });
  }

  if (!isWithinWindow(hhmm, state.windowStart, state.windowEnd)) {
    if (rolledOver) await saveReminderState({ dateKey: currentDateKey, completedToday: false });
    return NextResponse.json({ skipped: "outside-window", hhmm, window: [state.windowStart, state.windowEnd] });
  }

  if (state.lastNotifiedAt && Date.now() - state.lastNotifiedAt < THROTTLE_MS) {
    return NextResponse.json({ skipped: "throttled" });
  }

  try {
    ensureVapid();
    await webpush.sendNotification(
      subscription,
      JSON.stringify({ title: "Allah First", body: "N'oublie pas tes adhkar." })
    );
    await saveReminderState({
      dateKey: currentDateKey,
      completedToday: false,
      lastNotifiedAt: Date.now(),
    });
    return NextResponse.json({ sent: true });
  } catch (err: any) {
    // 410 Gone / 404 → the subscription is no longer valid, drop it so we stop retrying forever
    if (err?.statusCode === 410 || err?.statusCode === 404) {
      await kv.del("push:subscription");
      return NextResponse.json({ skipped: "subscription-expired" });
    }
    return NextResponse.json({ error: "send-failed", detail: String(err) }, { status: 500 });
  }
}
