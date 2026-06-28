// ISMS·LA service worker — 離線可用 app shell（cache-first）
const CACHE = "ismsla-v0.6.0";
const CORE = [
  "./", "index.html", "favicon.svg", "manifest.webmanifest", "icon-192.png", "icon-512.png", "og-image.png",
  "data/data.json", "data/supplements.json", "data/documents.json", "data/standards.json",
  "https://unpkg.com/cytoscape@3.34.0/dist/cytoscape.min.js",
  "https://unpkg.com/layout-base@2.0.1/layout-base.js",
  "https://unpkg.com/cose-base@2.2.0/cose-base.js",
  "https://unpkg.com/cytoscape-fcose@2.2.0/cytoscape-fcose.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await Promise.allSettled(CORE.map((u) => c.add(u))); // 單一資源失敗不擋安裝
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const res = await fetch(req);
      if (res && res.ok && new URL(req.url).origin === location.origin) {
        const c = await caches.open(CACHE);
        c.put(req, res.clone());
      }
      return res;
    } catch (err) {
      return cached || Response.error();
    }
  })());
});
