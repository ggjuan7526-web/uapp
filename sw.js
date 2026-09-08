'use strict';
const PREFIX = 'ud-shell:' + self.registration.scope + ':';
const CACHE = PREFIX + 'v2';
const ASSETS = ['index.html','app.js','editor.css','UD.jpg','icon.png','icon-192.png','manifest.webmanifest'];
self.addEventListener('install',event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(
    ASSETS.map(file => new URL(file,self.registration.scope).href)
  )));
});
self.addEventListener('activate',event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key))
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch',event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || !url.href.startsWith(self.registration.scope)) return;
  event.respondWith((async () => {
    if (event.request.mode === 'navigate') {
      try { return await fetch(event.request); }
      catch { return (await caches.open(CACHE)).match(new URL('index.html',self.registration.scope).href); }
    }
    return (await caches.match(event.request)) || fetch(event.request);
  })());
});
