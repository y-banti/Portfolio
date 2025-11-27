const CACHE_NAME = 'portfolio-sw-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/profile.JPG'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Try cache first, then network
  event.respondWith(
    caches.match(event.request).then((cachedResp) => {
      if (cachedResp) {
        return cachedResp;
      }
      return fetch(event.request).then((networkResp) => {
        // Optionally cache new requests
        return caches.open(CACHE_NAME).then((cache) => {
          // Don't cache non-GET requests
          if (event.request.method === 'GET') {
            cache.put(event.request, networkResp.clone()).catch(() => {});
          }
          return networkResp;
        });
      }).catch(() => {
        // Fallback for navigation requests: serve cached index
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
