
self.addEventListener('install',(e)=>{
    e.waitUntil(
        caches.open('app-v1').then((cache)=>{
            console.log('open')
            return cache.addAll([
                'a.js',
                'main.css',
                'index.html',
                'servers.js'
            ])
        })
    )
})

self.addEventListener('fetch',(e)=>{
    e.respondWith(
        caches.match(e.request).then((res)=>{
            if(res){
                return res
            }else{
                //发起请求
                // fetch(url).then((res)=>{
                //     if(res){
                //         caches
                //     }else{
                //         alert('error')
                //     }
                // })
            }
        })
    )
})