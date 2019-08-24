if(navigator.serviceWorker){
    var sendbtn=document.getElementById('send-msg'),
    msgInput=document.getElementById('msg-input')
    ,msgBox=document.getElementById('msg')
    sendbtn.addEventListener('click',()=>{
        //主页面发送消息到serversworker
        navigator.serviceWorker.controller.postMessage(msgInput.value)
    })
    navigator.serviceWorker.addEventListener('message',(e)=>{
        msgBox.innerHTML+='<li>'+e.data.message+'</li>'
    })
    navigator.serviceWorker.register('./msg-server.js',{scope:'./'}).then((reg)=>{
        console.log(reg)
    }).catch(err=>{
        console.log(err)
    })

}else{
    alert('server worker is not supported')
}