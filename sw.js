/* Service Worker — Brigade Verte NCPA
   Rôle : mettre en cache l'application pour qu'elle s'ouvre sans réseau.
   Les signalements, eux, sont stockés dans IndexedDB (côté page). */

const CACHE = 'ncpa-brigade-v1';
const FICHIERS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Installation : on précharge l'application dans le cache
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)));
  self.skipWaiting();
});

// Activation : on supprime les anciens caches (versions précédentes)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cles =>
      Promise.all(cles.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Requêtes : cache d'abord, réseau en secours (app 100 % hors ligne)
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return; // laisser passer les POST de synchro
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true })
      .then(rep => rep || fetch(e.request))
  );
});
