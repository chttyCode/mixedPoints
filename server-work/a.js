if(navigator.serviceWorker){
    navigator.serviceWorker.register('./servers.js',{scope:'./'})
    .then((reg)=>{
        console.log(reg)
    }).catch(err=>{
        console.log(err)
    })
}else{
    alert('serverswork is not supported')
}