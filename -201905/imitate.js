function Promise(excutor){
    this.state='pending'
    this.value=null;
    this.reason=null;
    this.onResolveCallbacks=[]
    this.onRejectedCallbacks=[]
    let self=this
    function resolve(value){
        if(value instanceof Promise){
            return value.then(resolve,reject)
        }       
        if(self.state=='pending'){
            self.value=value
            self.state='fulfilled'
            self.onResolveCallbacks.forEach(fn =>fn());
        }
    }
    function reject(reason){
        if(self.state=='pending'){
            self.reason=reason
            self.state='rejected'
            self.onRejectedCallbacks.forEach(fn=>fn())
        }
    }
    try{
        excutor(resolve,reject)
    }catch(err){
        reject(err)
    }
}
function resovlePromise(promise2,x,resolve,reject){
    if(promise2 === x){
       return  reject(new TypeError('循环引用'))//
    }
    if(x!=null&&(typeof x === 'object' || typeof x === 'function')){
        let called;
        try{
            let then=x.then
            if(typeof then === 'function'){
                then.call(x,y=>{
                    if(called)return
                    called=true
                    resovlePromise(promise2,y,resolve,reject)
                },err=>{
                    if(called)return
                    called=true
                    reject(err)
                })
            }else{
                resolve(x)
            }
        }catch(err){
            if(called)return
            called=true
            reject(err)
        }
    }else{
        resolve(x)
    }
}
Promise.prototype.then=function(onfulfilled,onrejected){
    onfulfilled=typeof onfulfilled == 'function'?onfulfilled:val=>val;
    onrejected=typeof onrejected == 'function'?onrejected:err=>{throw err}
    let self=this
    let promise2=new Promise(function(resolve,reject){
        if(self.state=='fulfilled'){
            setTimeout(function(){
                try{
                    let x = onfulfilled(self.value)
                    resovlePromise(promise2,x,resolve,reject)
                }catch(err){
                    reject(err)
                }
            })
        }
        if(self.state=='rejected'){
            setTimeout(function(){
                try{
                    let x = onrejected(self.reason)
                    resovlePromise(promise2,x,resolve,reject)
                }catch(err){
                    reject(err)
                }   
            })
        }
        if(self.state=='pending'){
            self.onResolveCallbacks.push(function(){
              setTimeout(function(){
              try{
                let x = onfulfilled(self.value)
                resovlePromise(promise2,x,resolve,reject)
              }catch(err){
                  reject(err)
              }
              })
            })
            self.onRejectedCallbacks.push(function(){
             setTimeout(function(){
                try{
                    let x =  onrejected(self.reason)
                    resovlePromise(promise2,x,resolve,reject)
                }catch(err){
                    reject(err)
                }
             })
            })
        }
    })
    return promise2
}
Promise.deferred=()=>{
    let dfd={}
    dfd.promise=new Promise((resolve,reject)=>{
        dfd.resolve=resolve
        dfd.reject=reject
    })
    return dfd
}
module.exports = Promise