// pamięć podręczna: strona i miniatury od razu, karty po pierwszym otwarciu (działa też bez zasięgu)
const CACHE = 'karty-v8';
const PRECACHE = ["./", "index.html", "logo.svg", "min/seria-1.jpg", "min/seria-2.jpg", "min/seria-3.jpg", "min/seria-4.jpg", "min/seria-5.jpg", "min/seria-6.jpg", "min/seria-7.jpg", "min/seria-8.jpg", "min/seria-9.jpg", "min/seria-10.jpg", "min/seria-11.jpg", "min/seria-12.jpg", "min/seria-13.jpg", "min/seria-14.jpg", "min/seria-15.jpg", "min/seria-16.jpg", "min/seria-17.jpg", "min/seria-18.jpg", "min/seria-19.jpg", "min/seria-20.jpg", "min/seria-21.jpg", "min/seria-22.jpg", "min/seria-23.jpg", "min/seria-24.jpg", "min/seria-25.jpg", "min/seria-26.jpg", "min/seria-27.jpg", "min/seria-28.jpg", "min/seria-29.jpg", "min/seria-30.jpg", "min/seria-31.jpg", "min/seria-32.jpg", "min/seria-33.jpg", "min/seria-34.jpg", "min/seria-35.jpg", "min/seria-36.jpg", "min/seria-37.jpg", "min/seria-38.jpg", "min/seria-39.jpg", "min/seria-40.jpg", "min/seria-41.jpg", "min/seria-42.jpg", "min/seria-43.jpg", "min/seria-44.jpg", "min/seria-45.jpg", "min/seria-46.jpg", "min/seria-47.jpg", "min/seria-48.jpg", "min/seria-49.jpg", "min/seria-50.jpg", "min/seria-51.jpg", "min/seria-69.jpg", "min/seria-70.jpg", "min/seria-71.jpg", "min/seria-72.jpg", "min/seria-73.jpg", "min/seria-74.jpg", "min/seria-75.jpg", "min/seria-76.jpg", "min/seria-77.jpg", "min/seria-78.jpg", "min/seria-79.jpg", "min/seria-80.jpg", "min/seria-81.jpg", "min/seria-82.jpg", "min/seria-83.jpg", "min/seria-84.jpg", "min/seria-85.jpg", "min/seria-86.jpg", "min/seria-87.jpg", "min/seria-88.jpg", "min/seria-89.jpg", "min/seria-90.jpg", "min/seria-91.jpg", "min/seria-92.jpg", "min/seria-93.jpg", "min/seria-94.jpg", "min/seria-95.jpg", "min/seria-96.jpg", "min/seria-97.jpg", "min/seria-98.jpg", "min/akcesoria-stelaze.jpg", "min/akcesoria-baterie-i-zaglowki.jpg", "min/akcesoria-odplyw-i-hydromasaz.jpg", "min/akcesoria-aeromasaz-chromoterapia-dezynfekcja.jpg"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  if (url.pathname.endsWith('/') || url.pathname.endsWith('index.html')) {
    // strona: najpierw sieć (świeże dane), potem pamięć
    e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); return r; })
      .catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
    if (r.ok) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); }
    return r;
  })));
});
