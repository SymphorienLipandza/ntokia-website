// Name of the cache
const CACHE_NAME = "ntokia-cache-v1";

// List of files to cache
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/images/NTOKIA.png",
  "/images/favicon-32x32.png",
  "/images/favicon-16x16.png",
  "/images/apple-touch-icon.png",
  "/images/hero-img.jpg"
];

// Install event - caching files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
                  .map(cacheName => caches.delete(cacheName))
      )
    )
  );
});

// Fetch event - serve cached files if available
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }
        // Fetch from network otherwise
        return fetch(event.request).catch(() => {
          // Optionally return fallback if offline
          if (event.request.destination === "document") {
            return caches.match("/index.html");
          }
        });
      })
  );
});
