/* NMS Passport v2.1 — offline shell durci, mise à jour réseau prioritaire */
const CACHE='nms-passport-v2.1-r6-final-verified';
const ASSETS=[
  './','index.html','css/style.css','script/script.js','script/vendor/qrcode-browser.js',
  'manifest.webmanifest','assets/icons/icon-192.png','assets/icons/icon-512.png','assets/icons/atlas-emblem.svg'
];
const INDEX_URL=new URL('index.html',self.registration.scope).href;
const CACHEABLE_PATHS=new Set(ASSETS.filter(path=>path!=='./').map(path=>new URL(path,self.registration.scope).pathname));

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;

  if(event.request.mode==='navigate'){
    event.respondWith(
      fetch(event.request)
        .then(response=>{
          if(response&&response.ok&&response.type==='basic'){
            const copy=response.clone();
            caches.open(CACHE).then(cache=>cache.put(INDEX_URL,copy));
          }
          return response;
        })
        .catch(()=>caches.match(INDEX_URL))
    );
    return;
  }

  if(!CACHEABLE_PATHS.has(url.pathname))return;
  event.respondWith(
    fetch(event.request)
      .then(response=>{
        if(response&&response.ok&&response.type==='basic'){
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(event.request,copy));
        }
        return response;
      })
      .catch(()=>caches.match(event.request))
  );
});
