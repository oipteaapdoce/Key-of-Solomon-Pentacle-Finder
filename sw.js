// Key of Solomon Pentacle Finder, service worker (offline shell cache)
var CACHE = 'key-solomon-v7';
var CORE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./images/hero-engraving.jpg",
  "./images/1stJupiter.gif",
  "./images/1stMars.gif",
  "./images/1stMercury.gif",
  "./images/1stMoon.gif",
  "./images/1stSaturn.gif",
  "./images/1stSun.gif",
  "./images/1stVenus.gif",
  "./images/2ndJupiter.gif",
  "./images/2ndMars.gif",
  "./images/2ndMercury.gif",
  "./images/2ndMoon.gif",
  "./images/2ndSaturn.gif",
  "./images/2ndSun.gif",
  "./images/2ndVenus.gif",
  "./images/3rdJupiter.gif",
  "./images/3rdMars.gif",
  "./images/3rdMercury.gif",
  "./images/3rdMoon.gif",
  "./images/3rdSaturn.gif",
  "./images/3rdSun.gif",
  "./images/3rdVenus.gif",
  "./images/4thJupiter.gif",
  "./images/4thMars.gif",
  "./images/4thMercury.gif",
  "./images/4thMoon.gif",
  "./images/4thSaturn.gif",
  "./images/4thSun.gif",
  "./images/4thVenus.gif",
  "./images/5thJupiter.gif",
  "./images/5thMars.gif",
  "./images/5thMercury.gif",
  "./images/5thMoon.gif",
  "./images/5thSaturn.gif",
  "./images/5thSun.gif",
  "./images/5thVenus.gif",
  "./images/6thJupiter.gif",
  "./images/6thMars.gif",
  "./images/6thMoon.gif",
  "./images/6thSaturn.gif",
  "./images/6thSun.gif",
  "./images/7thJupiter.gif",
  "./images/7thMars.gif",
  "./images/7thSaturn.gif",
  "./images/7thSun.gif"
];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.map(function (k) { return k === CACHE ? null : caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      return hit || fetch(e.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        return res;
      });
    })
  );
});
