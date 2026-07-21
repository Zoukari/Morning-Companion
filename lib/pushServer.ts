import { Redis } from "@upstash/redis";
import webpush from "web-push";

const kv = Redis.fromEnv();

const SUB_KEY = "push:subscription";
const STATE_KEY = "push:state";

export type ReminderState = {
  windowStart: string;  // "HH:MM", local to timeZone
  windowEnd: string;    // "HH:MM", local to timeZone
  timeZone: string;     // IANA zone, e.g. "Africa/Djibouti"
  completedToday: boolean;
  dateKey: string;      // "YYYY-MM-DD" in timeZone, the day completedToday applies to
  lastNotifiedAt: number | null; // epoch ms
};

export const defaultReminderState: ReminderState = {
  windowStart: "05:00",
  windowEnd: "06:30",
  timeZone: "Africa/Djibouti",
  completedToday: false,
  dateKey: "",
  lastNotifiedAt: null,
};

export async function getSubscription() {
  return (await kv.get(SUB_KEY)) as any | null;
}

export async function saveSubscription(subscription: unknown) {
  await kv.set(SUB_KEY, subscription);
}

export async function getReminderState(): Promise<ReminderState> {
  const stored = (await kv.get(STATE_KEY)) as ReminderState | null;
  return stored ? { ...defaultReminderState, ...stored } : defaultReminderState;
}

export async function saveReminderState(patch: Partial<ReminderState>) {
  const current = await getReminderState();
  const next = { ...current, ...patch };
  await kv.set(STATE_KEY, next);
  return next;
}

let vapidConfigured = false;
export function ensureVapid() {
  if (vapidConfigured) return;
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!publicKey || !privateKey) {
    throw new Error("Missing VAPID keys — set NEXT_PUBLIC_VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY.");
  }
  webpush.setVapidDetails("mailto:notifications@morning-companion.app", publicKey, privateKey);
  vapidConfigured = true;
}

export { webpush, kv };

/** Current "HH:MM" and "YYYY-MM-DD" in the given IANA time zone, no extra deps. */
export function nowInTimeZone(timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  const dateKey = `${get("year")}-${get("month")}-${get("day")}`;
  const hhmm = `${get("hour")}:${get("minute")}`;
  return { dateKey, hhmm };
}

/** Is "HH:MM" current time within [start, end)? Handles same-day windows only. */
export function isWithinWindow(current: string, start: string, end: string) {
  return current >= start && current < end;
}
