// The name of my cache
const cacheName = "my-pwa-shell-v1.03";
//The files I'm going to cache
const filesToCache = [
  "/",
  "./index.html",
  "./manifest.json",
  "./favicon.ico",
  "./static/media/OpenSans.071a1becc7f00e33cc5b.ttf",
  "./favicon-16.png",
  "./favicon-32.png",
  "./static/js/205.f9d03569.js",
  "./static/js/205.f9d03569.js.LICENSE.txt",
  "./static/js/205.f9d03569.js.map",
  "./static/js/main.c41f302b.js",
  "./static/js/main.c41f302b.js.map"
];

self.addEventListener("install", e => {
  console.log("[ServiceWorker] - Install");
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log("[ServiceWorker] - Caching app shell");
    await cache.addAll(filesToCache);
  })());
});

self.addEventListener('fetch', function (event) {
  if (!navigator.onLine) {

    event.respondWith(
      caches.match(event.request, { ignoreSearch: true, ignoreMethod: true, ignoreVary: true })
        .then(function (response) {
          if (response) return response;
        }))}})