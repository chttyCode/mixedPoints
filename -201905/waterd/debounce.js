//debounce防抖在于多次合成一次执行效果，或者只有最后一次触发
function debounce(fn,delay){    
    let timer;
    let context=this,args=arguments;
    return function(e){
        if(timer)clearTimeout(timer)
        setTimeout(()=>{
            fn.call(context,agrs)
        },delay)
    }
}

function debounce(func, delay) {
    var timeout;
    return function(e) {
        console.log("清除",timeout,e.target.value)
        clearTimeout(timeout);
        var context = this, args = arguments
        console.log("新的",timeout, e.target.value)
        timeout = setTimeout(function(){
          console.log("----")
          func.apply(context, args);
        },delay)
    };
};