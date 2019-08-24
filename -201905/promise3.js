let pending='pending',fulfilled='fulfilled', rejected='rejected',fn='function',obj='object'
function Promise (excutor){
    this.state=pending;
    this.value;
    this.reason;
    this.onfulfilledCallback=[];
    this.onrejectedCallback=[];
    let self = this;
    function resolve(value){
        if(value instanceof Promise){
            value.then(resolve,reject)
        }
        if(self.state==pending){
            self.value=value
            self.state=fulfilled
            self.onfulfilledCallback.forEach(fn=>fn())
        }
    }
    function reject(err){
        if(self.state==pending){
            self.state=rejected
            self.reason=err
            self.onrejectedCallback.forEach(fn=>fn())
        }
    }
    try{
        excutor(resolve,reject)
    }catch(err){
        reject(err)
    }
}
Promise.prototype.then=function(onfulfilled,onrejected){
    onfulfilled=typeof onfulfilled == fn?onfulfilled:val=>val
    onrejected= typeof onrejected == fn?onrejected:err=>{throw err}
    let self=this
    let promise2=new Promise((resolve,reject)=>{
        if(self.state==pending){
            self.onfulfilledCallback.push(()=>{
                setTimeout(()=>{
                    try{
                        let x = onfulfilled(self.value)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
                })
            })
            self.onrejectedCallback.push(()=>{
                setTimeout(()=>{
                    try{
                        let x = onrejected(self.reason)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
                })
            })
        }
        if(self.state==fulfilled){
            setTimeout(()=>{
                try{
                    let x = onfulfilled(self.value)
                    resolvePromise(promise2,x,resolve,reject)
                }catch(err){
                    reject(err)
                }
            })
        }
        if(self.state==rejected){
            setTimeout(()=>{
                try{
                    let x = onrejected(self.reason)
                    resolvePromise(promise2,x,resolve,reject)
                }catch(err){
                    reject(err)
                }
            })
        }
    })
    return promise2
}
function resolvePromise(promise2,x,resolve,reject){
    if(promise2 === x){
        reject(new TypeError('循环引用'))
    }
    if(x!==null&&(typeof x === obj || typeof x === fn)){
        let called;
        try{
            let then = x.then
            if(typeof then == fn){
                then.call(x,y=>{
                    if(called)return
                    called=true
                    resolvePromise(promise2,y,resolve,reject)
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
Promise.deferred=()=>{
    let dfd={}
    dfd.promise=new Promise((resolve,reject)=>{
        dfd.resolve=resolve
        dfd.reject=reject
    })
    return dfd
}
module.exports = Promise