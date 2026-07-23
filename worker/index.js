// Merged into the generated sw.js by @ducanh2912/next-pwa (customWorkerSrc).
// Runs in the service worker thread — no DOM, no imports beyond self.*.

self.addEventListener("push", (event) => {
  let data = { title: "Allah First", body: "N'oublie pas tes adhkar." };
  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch (e) {
    // if the payload isn't JSON, fall back to the defaults above
  }

  const options = {
    body: data.body,
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    tag: "morning-companion-reminder", // replaces any previous unread reminder instead of stacking
    renotify: true,
    data: { url: "/" },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientsArr) => {
      const existing = clientsArr.find((c) => c.url.includes(self.location.origin));
      if (existing) return existing.focus();
      return self.clients.openWindow(targetUrl);
    })
  );
});
