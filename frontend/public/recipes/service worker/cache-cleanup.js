/* Clean up legacy named caches */

self.addEventListener("activate", function (event) {

    event.waitUntil(
  
      caches.keys().then(cacheNames => {
        cacheNames.forEach(value => {

          if (value.indexOf(version) < 0) {
            caches.delete(value);
          }

        });
  
        console.log("service worker activated");
  
        return;

      })
      
    );
  
  });
  