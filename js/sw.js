const CACHE_NAME = 'version1';

importScripts(
    'https://cdnjs.cloudflare.com/ajax/libs/workbox-sw/6.0.2/workbox-sw.js'
);

self.addEventListener('message', event => {
    if(event.data && event.data.type == "SKIP_WAITING"){
        self.skipWaiting();
    };
});

workbox.routing.registerRoute(
    new RegExp('/*'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: CACHE_NAME
    })
);