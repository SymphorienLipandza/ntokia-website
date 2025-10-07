// Name of the cache
const CACHE_NAME = "ntokia-cache";

// Files to cache on install (rarely changing)
const STATIC_ASSETS = [
  "/",
  "/index.html",
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
  const pathname = requestUrl.pathname;

  // Network-first strategy for images, CSS, and JS
  if (
    pathname.startsWith("/images/") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".js")
  ) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          // Update cache with the latest file
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
        if (event.request.destination === "document") {
          return caches.match("/index.html");
        }
      })
  );
});
