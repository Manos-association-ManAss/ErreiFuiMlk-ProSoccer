// Choose a cache name
const cacheName = 'cache-v1'

// List the files to precache
const precacheResources = [
  './',
  './index.html',
  './main.css',
  './assets/abertura/abertura.png',
  './assets/abertura/BotãoAbertura.png',
  './assets/albuns/yeezus.png',
  './assets/logo/128.png',
  './assets/logo/192.png',
  './assets/logo/256.png',
  './assets/logo/384.png',
  './assets/logo/512.png',
  './assets/mapa/mapa.json',
  './assets/mapa/MapaTiles.png',
  './assets/salas/FundoSalas.png',
  './assets/salas/Sala01.png',
  './assets/salas/Sala02.png',
  './assets/salas/Sala03.png',
  './assets/salas/Sala04.png',
  './assets/sons/allofthelights.mp3',
  './assets/sons/clique.mp3',
  './assets/sons/credito.mp3',
  './assets/sons/crianças.mp3',
  './assets/sons/erro.mp3',
  './assets/sons/gameOverSom.mp3',
  './assets/sons/moedaSom.mp3',
  './assets/cima.png',
  './assets/direita.mp3',
  './assets/esquerda.mp3',
  './assets/money.mp3',
  './assets/tyler.png',
  './assets/vida.png',
  './assets/YE.png',
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