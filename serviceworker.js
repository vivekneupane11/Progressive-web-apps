//cache name
var ourcachename = "v10";

//Files that need to be cache

var cacheFiles =[
    './',
    './index.html',
    './style.css',
    './img1.jpg',
    './img2.jpg',
    './img3.jpg'
];

//install , //create a cache file
self.addEventListener('install',event=>{
event.waitUntil(
    caches.open(ourcachename)
    .then(cache=>{
        return cache.addAll(cacheFiles);
    })
    .catch(err=>{
        console.log("Problem when creating cache",err);
    })
)
console.log("Service Worker Installed");
self.skipWaiting();
});




self.addEventListener('activate',event=>{
event.waitUntil( 
caches.keys() //provide the name of all caches
.then(cacheNames=>{
return Promise.all(
cacheNames.map(cache=>{
if(cache != ourcachename){
console.info("Deleting old cacahe",cache)
return caches.delete(cache);

}
})
)
})

)
return self.clients.claim(); 
});

//fetch , handles network request
self.addEventListener('fetch',event=>{
    event.respondWith(
        caches.match(event.request)
        .then(res=>{
            return res || fetch(event.request);
        })
    )
});