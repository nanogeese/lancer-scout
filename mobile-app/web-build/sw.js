// The name of my cache
const cacheName = "lancer-scout-pwa-v1.02";
//The files I'm going to cache
const filesToCache = [
  "/",
  "./index.html",
  "./manifest.json",
  "./favicon.ico",
  "./static/media/OpenSans.071a1becc7f00e33cc5b.ttf",
  "./favicon-16.png",
  "./favicon-32.png",
  "./static/js/205.302f0300.js",
  "./static/js/205.302f0300.js.LICENSE.txt",
  "./static/js/205.302f0300.js.map",
  "./static/js/main.f8d79430.js",
  "./static/js/main.f8d79430.js.map"
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