// Life Manager service worker — powers reliable notifications.
// Notifications are shown via registration.showNotification() so they
// work even when the app is in the background, and taps on a notification
// focus the app (and open the relevant tab).

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// No offline caching — the app always uses the network as normal.
self.addEventListener('fetch', () => {});

// Tapping a notification: focus the open app (and switch tab) or open it.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const tab = (event.notification.data && event.notification.data.tab) || '';

  event.waitUntil((async () => {
    const clientList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of clientList) {
      if ('focus' in client) {
        await client.focus();
        if (tab) client.postMessage({ tab });
        return;
      }
    }
    if (self.clients.openWindow) {
      await self.clients.openWindow('./index.html' + (tab ? '?tab=' + encodeURIComponent(tab) : ''));
    }
  })());
});

