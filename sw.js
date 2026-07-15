// Minimal service worker — required by Chrome/Android for "installable" status.
// It doesn't cache anything, it just needs to exist and respond to fetch.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
self.addEventListener('fetch', () => {}); // no-op, network is used as normal
