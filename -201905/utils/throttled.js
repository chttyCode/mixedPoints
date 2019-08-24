export const throttled =(fn)=>{
    let timestamp=0,self=this,timer
    return (...arg)=>{
        let newtimestamp=Date.now()
        if(newtimestamp-timestamp>3000){
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timestamp=newtimestamp
            return fn.call(self,arg)
        }else if(!timer){
            timer = setTimeout(()=>{
                timestamp=Date.now();
                timer=null;
                fn.call(self,arg)
            }, 3000);
        }
    }
}