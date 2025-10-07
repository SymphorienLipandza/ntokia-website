// Name of the cache
const CACHE_NAME = "ntokia-cache";

// Files to cache on install (rarely changing files)
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/images/NTOKIA.png",
  "/images/favicon-32x32.png",
  "/images/favicon-16x16.png",
  "/images/apple-touch-icon.png"
];

// Install event - cache static assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate event - cleanup old caches if any
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME)
                      .map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener("fetch", event => {
  const requestUrl = new URL(event.request.url);

  // Network-first strategy for images (always get latest)
  if (requestUrl.pathname.startsWith("/images/")) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          // Update the cache with the new image
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse.clone()));
          return networkResponse;
        })
        .catch(() => caches.match(event.request)) // fallback to cache if offline
    );
    return;
  }

  // Cache-first strategy for static assets
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => {
        // fallback to index.html if offline and request is document
        if (event.request.destination === "document") {
          return caches.match("/index.html");
        }
      })
  );
});
