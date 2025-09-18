const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/static/js/bundle.js",
  "/favicon.ico",
  "/logo192.png",
  "/manifest.json",
  "/api/data"
];

// Install → cache files
this.addEventListener("install", (event) => {
  console.log("✅ Service Worker Installed");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching files...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate → cleanup old cache
this.addEventListener("activate", (event) => {
  console.log("✅ Service Worker Activated");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch → handle requests
this.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/api/data")) {
    // Network first for API calls
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          this.registration.showNotification("⚠️ Offline Mode", {
            body: "You are offline. Loading data from cache.",
            icon: "/logo192.png",
          });
          return caches.match(event.request).then((cachedResponse) => {
            return (
              cachedResponse ||
              new Response("You are offline and this data is not cached.", { status: 503 })
            );
          });
        })
    );
  } else {
    // Cache first for assets
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});

// Push notifications
this.addEventListener("push", (event) => {
  const data = event.data ? event.data.text() : "No payload";
  event.waitUntil(
    this.registration.showNotification("🔔 Push Notification", {
      body: data,
      icon: "/logo192.png",
      vibrate: [200, 100, 200],
    })
  );
});
