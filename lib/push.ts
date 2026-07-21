"use client";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

export async function isPushSupported() {
  return typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window;
}

/** Requests notification permission, subscribes via the service worker, and registers with our server. */
export async function enablePush(): Promise<{ ok: boolean; reason?: string }> {
  if (!(await isPushSupported())) return { ok: false, reason: "unsupported" };

  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!publicKey) return { ok: false, reason: "missing-vapid-key" };

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return { ok: false, reason: "denied" };

  try {
    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
    }
    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscription.toJSON()),
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: "subscribe-failed" };
  }
}

export type SyncPayload = {
  windowStart: string;
  windowEnd: string;
  timeZone: string;
  completedToday: boolean;
  dateKey: string;
};

/** Fire-and-forget: tells the server the current reminder window + today's status. */
export function syncReminderState(payload: SyncPayload) {
  try {
    fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch (e) {
    // best-effort — local app state is unaffected either way
  }
}

export function detectTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Africa/Djibouti";
  } catch (e) {
    return "Africa/Djibouti";
  }
}
