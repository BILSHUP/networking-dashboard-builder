// Minimal service worker — enough to make the app installable and resilient offline.
// Strategy: never touch /api/* (always live), network-first for pages, cache-first for static assets.
const CACHE = "ndb-v1";
const PRECACHE = [
  "/",
  "/networking-builder.html",
  "/networking-dashboard-demo.html",
  "/manifest.webmanifest",
  "/icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  // Never cache API calls — they must always hit the server.
  if (url.pathname.startsWith("/api/")) return;
  // Only handle same-origin requests.
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    // Network-first for navigations, fall back to cache when offline.
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match("/"))),
    );
    return;
  }

  // Cache-first for other GETs (assets).
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
          return res;
        }),
    ),
  );
});
