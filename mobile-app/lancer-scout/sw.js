const cacheName = "lancer-scout-v2-v1"
const appShellFiles = [
    "./web-build/"
]

self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install")

    e.waitUntil(
        (async () => {
          const cache = await caches.open(cacheName)
          console.log("[Service Worker] Caching all: app shell and content")
          await cache.addAll(contentToCache)
        })()
    )
})