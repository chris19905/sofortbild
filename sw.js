var CACHE = 'sofortbild-v2';
var CORE = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon.svg'];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(CORE); }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener('fetch', function(e){
  if(e.request.method !== 'GET') return;

  var isPage = e.request.mode === 'navigate' || /\.html($|\?)/.test(e.request.url);

  if(isPage){
    // Erst das Netz fragen, damit eine neu hochgeladene Fassung sofort ankommt
    e.respondWith(
      fetch(e.request).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copy); }).catch(function(){});
        return res;
      }).catch(function(){
        return caches.match(e.request).then(function(hit){ return hit || caches.match('./index.html'); });
      })
    );
    return;
  }

  // Alles andere (Icons, Schriften) darf aus dem Cache kommen
  e.respondWith(
    caches.match(e.request).then(function(hit){
      if(hit) return hit;
      return fetch(e.request).then(function(res){
        if(res && (res.ok || res.type === 'opaque')){
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(e.request, copy); }).catch(function(){});
        }
        return res;
      }).catch(function(){ return Response.error(); });
    })
  );
});
