self.addEventListener('message',(e)=>{
    let promise=self.clients.matchAll().then((clients)=>{
        var sendId=e.source?e.source.id:'unknown'
        clients.forEach(client=>{
            if(client.id==sendId){
                return
            }else{
                client.postMessage({
                    client:sendId,
                    message:e.data 
                })
            }
        })
    })
    e.waitUntil(promise)
})