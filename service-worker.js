// Minimalny service worker — wymagany przez Chrome/Android, aby aplikację
// można było zainstalować na ekranie głównym ("Add to Home Screen").
// Appka jest w pełni statyczna (nie ma żadnych wywołań API) — cache służy
// tu wyłącznie jako fallback offline dla powłoki strony.
//
// WAŻNE: strategia "network-first" (nie "cache-first"), tak samo jak w
// service-worker.js appki "Analiza Działki" tej samej autorki. Zawsze
// próbujemy najpierw sieci, więc zaktualizowany index.html wdrożony na
// GitHub Pages dociera od razu — cache jest używany tylko, gdy urządzenie
// jest offline.

const CACHE_NAME = "wyszukiwarka-dzialek-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
