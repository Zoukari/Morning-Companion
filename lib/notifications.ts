"use client";

// Best-effort LOCAL notifications: these only fire while the app/PWA is open
// in the background (a tab or an installed standalone window). True push
// notifications that wake the phone when the app is fully closed require a
// backend with VAPID keys — see README "Aller plus loin" section.

export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const result = await Notification.requestPermission();
  return result === "granted";
}

let scheduledTimer: ReturnType<typeof setTimeout> | null = null;

export function scheduleDailyReminder(timeHHMM: string, isAdhkarDoneToday: () => boolean) {
  if (typeof window === "undefined") return;
  if (scheduledTimer) clearTimeout(scheduledTimer);

  const [h, m] = timeHHMM.split(":").map(Number);
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0);
  if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);

  const delay = next.getTime() - now.getTime();
  scheduledTimer = setTimeout(function fire() {
    if (!isAdhkarDoneToday() && Notification.permission === "granted") {
      new Notification("Morning Companion", {
        body: "N'oublie pas tes adhkar.",
        icon: "/icons/icon-192.png",
        badge: "/icons/icon-192.png",
      });
    }
    // reschedule for the next day
    scheduledTimer = setTimeout(fire, 24 * 60 * 60 * 1000);
  }, delay);
}

export function cancelDailyReminder() {
  if (scheduledTimer) clearTimeout(scheduledTimer);
  scheduledTimer = null;
}
