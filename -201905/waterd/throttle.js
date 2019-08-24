//节流在于控制触发次数而不是一直不触发
function throttle(fun,thro){
    let timer,time=new Date()-0,context=this
    return function(e){
        let curr=new Date()-0,args=arguments;
        if(curr-time>thro){
            fun.apply(context,args)
        }else{
            setTimeout(()=>{
                fun.apply(context,args)       
            },thro)
        }
    }
}

function throttle(fn, threshhold) {
    var timeout
    var start = new Date;
    var threshhold = threshhold || 160
    return function () {
   
    var context = this, args = arguments, curr = new Date() - 0
    
    clearTimeout(timeout)//总是干掉事件回调
    if(curr - start >= threshhold){ 
        console.log("now", curr, curr - start)//注意这里相减的结果，都差不多是160左右
        fn.apply(context, args) //只执行一部分方法，这些方法是在某个时间段内执行一次
        start = curr
    }else{
    //让方法在脱离事件后也能执行一次
        timeout = setTimeout(function(){
           fn.apply(context, args) 
        }, threshhold);
       }
     }
   }