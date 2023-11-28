// Choose a cache name
const cacheName = 'cache-v1'

// List the files to precache
const precacheResources = [
  './',
  './index.html',
  './main.css',
  './assets/logo/128.png',
  './assets/logo/192.png',
  './assets/logo/256.png',
  './assets/logo/384.png',
  './assets/logo/512.png',
  './assets/abertura/abertura.png',
  './assets/abertura/BotãoAbertura.png',
  './assets/mapa/MapaTiles.png',
  './assets/salas/FundoSalas.png',
  './assets/salas/Sala01.png',
  './assets/salas/Sala02.png',
  './assets/salas/Sala03.png',
  './assets/salas/Sala04.png',
  './assets/sons/allofthelights.mp3',
  './assets/sons/moeda.mp3',
  './assets/vilao/bike.png',
  './assets/vilao/cudi.png',
  './assets/vilao/drake.png',
  './assets/vilao/graduation.png',
  './assets/vilao/pau.png',
  './assets/vilao/terra.png',
  './assets/vilao/twitter.png',
  './assets/baixo.png',
  './assets/balaoT.png',
  './assets/cima.png',
  './assets/direita.mp3',
  './assets/esquerda.mp3',
  './assets/MapaTiles.png',
  './assets/money.mp3',
  './assets/poder.png',
  './assets/projetilT.png',
  './assets/projetilT2.png',
  './assets/projetilY.png',
  './assets/projetilY2.png',
  './assets/tyler.png',
  './assets/vida.png',
  './assets/YE.png',
  './assets/tela-cheia.png',
  './assets/tobias.png',
  '/dist/index.js'
]

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
  console.log('Service worker install event!')
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)))
})

self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!')
})

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request)
    })
  )
})