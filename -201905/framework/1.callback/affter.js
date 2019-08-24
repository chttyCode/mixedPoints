function ajax(){
    console.log('3次执行')
}
ajax.affter=function(times,callback){
    return ()=>{
        if(--times<=0){
            callback()
            this()
        }
    }
}
const newAjax=ajax.affter(3,()=>{
    console.log('已达到次数，可以发起请求')
})
newAjax()
newAjax()
newAjax()
newAjax()