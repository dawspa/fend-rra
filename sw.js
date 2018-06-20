var CACHE_NAME = 'restaurant-reviews';
var urlsToCache = [
  '/',
  '/data/',
  '/css/',
  '/img/'
];

// setup a cache with the local files already
// pre-cached.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});


// intercept fetch calls.
// first check if request is already located in the cache
// if not, then fetch the event and cache it.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request).then(response => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});