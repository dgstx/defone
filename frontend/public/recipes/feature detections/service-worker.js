
//check if service workers are supported before attemping to register the service worker
if ('serviceWorker' in navigator) {  

    //do service worker stuff, like register a service worker
    navigator.serviceWorker.register('/sw.js').then(function (registration) {    // Registration was successful
           
        console.log('ServiceWorker registration successful with scope: ', registration.scope);  

    }).catch(function (err) {    // registration failed :(
           
        console.log('ServiceWorker registration failed: ', err);  
    });

}