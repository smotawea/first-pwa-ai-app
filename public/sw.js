// Change 'v1' to 'v2' to force the phone to download the new version
const CACHE_NAME = 'pwa-hello-world-v1';

// All paths are relative to where index.html is, but since the SW
// is inside /public/, we use absolute-style paths from the root.
const ASSETS = [
    '../',
    '../index.html',
    './manifest.json',
    './assets/cat.jpg'
];

// Install: Save files to phone memory
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('SW: Caching App Shell');
            return cache.addAll(ASSETS);
        })
    );
});

// Fetch: Serve files from phone memory (Offline support)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});

// Activate: Delete old cache versions
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});