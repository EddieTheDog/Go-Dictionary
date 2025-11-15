const CACHE_NAME = 'go-dict-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/playlist.html',
  '/src/app.js',
  '/src/dictionary.js',
  '/src/playlist.js',
  '/public/manifest.json'
];

// Install SW
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch cached files
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
