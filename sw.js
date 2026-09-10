var CACHE = 'disboard-sw-v1';

self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(clients.claim()); });

function stageOf(url) {
  var m = url.match(/STG=([1-6])/);
  return m ? m[1] : '1';
}

self.addEventListener('fetch', function(event) {
  var url = event.request.url;
  if (url.indexOf('app/') === -1 && url.indexOf('app?') === -1) return;
  if (url.indexOf('m=qa') !== -1 || url.indexOf('m%3Dqa') !== -1) {
    var st = stageOf(url);
    event.respondWith(
      fetch('data/qa' + st + '.txt').then(function(r){
        if (r.ok) return r;
        return fetch('data/qa1.txt');
      }).then(function(r){
        return r.text().then(function(t){
          return new Response(t, {headers: {'Content-Type': 'text/plain; charset=utf-8'}});
        });
      }).catch(function(){
        return new Response('1\tTest question - is Ruffle working?\tYES\tNO\tNO\tNO\n', {headers: {'Content-Type': 'text/plain; charset=utf-8'}});
      })
    );
  } else if (url.indexOf('m=ranking') !== -1 || url.indexOf('m%3Dranking') !== -1) {
    var st2 = stageOf(url);
    event.respondWith(
      fetch('data/ranking' + st2 + '.txt').then(function(r){
        if (r.ok) return r;
        return fetch('data/ranking1.txt');
      }).then(function(r){
        return r.text().then(function(t){
          return new Response(t, {headers: {'Content-Type': 'text/plain; charset=utf-8'}});
        });
      }).catch(function(){
        return new Response('10000\tBlank\n9000\tSora\n8000\tShiro\n', {headers: {'Content-Type': 'text/plain; charset=utf-8'}});
      })
    );
  } else if (url.indexOf('m=entryc') !== -1) {
    event.respondWith(new Response('OK', {headers: {'Content-Type': 'text/plain'}}));
  }
});
