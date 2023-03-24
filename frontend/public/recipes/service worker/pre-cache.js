self.addEventListener("install", function (event) {

    //only use if you are 100% sure it wont break your application UX
    self.skipWaiting();
    
    event.waitUntil(
      //pre-cache
      //on install as a dependency
      caches.open(preCacheName).then(function (cache) {
        //won't delay install completing and won't cause installation to
        //fail if caching fails.
        //the difference is as dependency returns a Promise, the
        //no dependency does not.
        //on install not as dependency (lazy-load)
        console.log("caches add as no-dependency");
  
        cache.addAll(precache_no_dependency_urls);
  
        console.log("caches add as dependency");
  
        return cache.addAll(precache_urls);
      })
    );
  });
  