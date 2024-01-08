importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

const { NetworkFirst, CacheFirst, StaleWhileRevalidate } = workbox.strategies;
const { registerRoute, setCatchHandler } = workbox.routing;
const { warmStrategyCache } = workbox.recipes;
const strategy = new CacheFirst();
const urls = ['/offline.html'];
warmStrategyCache({ urls, strategy });

function onInstall(event) {
  console.log('[Serviceworker]', 'Installing!', event);
}

function onActivate(event) {
  console.log('[Serviceworker]', 'Activating!', event);
}

function onFetch(event) {
  console.log('[Serviceworker]', 'Fetching!', event);
}
self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('fetch', onFetch);

registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

registerRoute(
  ({ request, url }) =>
    request.destination === 'document' ||
    (request.destination === '' &&
      !url.pathname.includes('/network_test.png')),
  new NetworkFirst({
    cacheName: 'documents',
  })
);

registerRoute(
  ({ request }) =>
    request.destination === 'script' || request.destination === 'style',
  new CacheFirst({
    cacheName: 'styles-and-scripts',
  })
);

registerRoute(
  ({ request }) => request.destination === 'images',
  new CacheFirst({
    cacheName: 'assets-images',
  })
);

setCatchHandler(async ({ event }) => {
  switch (event.request.destination) {
    case 'document':
      return strategy.handle({ event, request: urls[0] });
    default:
      return Response.error();
  }
});

// const checkOnlineStatus = async () => {
//   try {
//     const online = await fetch('/network_test.png');
//     return online.status >= 200 && online.status < 300;
//   }catch (error) {
//     return false;
//   }
// }

// setInterval(async () => {
//   const online = await checkOnlineStatus();
//   if (online) {
//     console.log('online');
//   }
//   else {
//     console.log('offline');
//   }
// }, 5000);

const checkOnlineStatus = async () => {
  try {
    const url = new URL('/network_test.png', 'http://localhost:3000');

    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};

setInterval(async () => {
  const online = await checkOnlineStatus();
  if (online) {
    console.log('online');
  } else {
    console.log('offline');
  }
}, 60000);


