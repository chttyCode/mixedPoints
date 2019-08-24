class Promise{
    constructor(executor){
        this.state='pending'
        this.value=null
        this.reason=null
        this.fulfilledCallback=[]
        this.rejectedCallback=[]
        let self=this
        function resolve(value){
            if(value instanceof Promise){
                value.then(resolve,reject)
            }
            if(self.state=='pending'){
                self.state='fulfilled'
                self.value=value
                self.fulfilledCallback.forEach(fn =>fn());
            }
        }
        function reject(reason){
            if(self.state=='pending'){
                self.state='rejected'
                self.reason=reason
                self.rejectedCallback.forEach(fn =>fn());
            }
        }
        try{
            executor(resolve,reject)
        }catch(err){
            reject(err)
        }
    }
    then(onFulfilled,onRejected){
        onFulfilled=typeof onFulfilled == 'function'?onFulfilled:val=>val
        onRejected=typeof onRejected == 'function'?onRejected:err=>{throw err}
        let promise2=new Promise((resolve,reject)=>{
            if(this.state=='fulfilled'){
                setTimeout(()=>{
                    try{
                        let x=onFulfilled(this.value)
                        this.resolvePromise(promise2,x,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
                })
            }
            if(this.state=='rejected'){
                setTimeout(()=>{
                    try{
                        let x=onRejected(this.reason)
                        this.resolvePromise(promise2,x,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
                })
            }
            if(this.state=='pending'){
                this.fulfilledCallback.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x=onFulfilled(this.value)
                            this.resolvePromise(promise2,x,resolve,reject)
                        }catch(err){
                            reject(err)
                        }
                    })
                })
                this.rejectedCallback.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x=onRejected(this.reason)
                            this.resolvePromise(promise2,x,resolve,reject)
                        }catch(err){
                            reject(err)
                        }
                    })
                })
            }
        })
        return promise2
    }
    resolvePromise(promise2,x,resolve,reject){
        if(promise2===x){reject(new TypeError('循環引用'))}
        if(x!==null&&(typeof x==='object'||typeof x==='function')){
            let called;
           try{
            let then=x.then
            if(typeof then == 'function'){
                then.call(x,y=>{
                    if(called)return
                    called=true
                    this.resolvePromise(promise2,y,resolve,reject)
                },err=>{
                    if(called)return
                    called=true
                    reject(err)
                })
            }else{
                resolve(then)
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
}
Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};
module.exports = Promise