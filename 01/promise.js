const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise {
    constructor(excutor){
        this.state=PENDING
        this.value;
        this.reason;
        this.fulfilledBack=[]
        this.rejectedBack=[]
        const resolve=(value)=>{
            if(value instanceof Promise){
                return value.then(resolve,reject)
            }
            if(this.state == PENDING){
                this.value=value
                this.state=FULFILLED
                this.fulfilledBack.forEach(fn=>fn())
            }
        }   
        const reject=(err)=>{
            if(this.state == PENDING){
                this.reason=err
                this.state=REJECTED
                this.rejectedBack.forEach(fn=>fn())
            }
        }
        try{
            excutor(resolve,reject)
        }catch(err){
            reject(err)
        }
    }
    then(onFulfilled,onRejected){
        onFulfilled = typeof onFulfilled == 'function'?onFulfilled:value=>value
        onRejected = typeof onRejected == 'function'?onRejected:(err)=>{throw err}
        let promoise2 = new Promise((resolve,reject)=>{
            if(this.state == PENDING){
                this.fulfilledBack.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onFulfilled(this.value)
                            this.resolvePromise(promoise2,x,resolve,reject)
                        }catch(err){
                            reject(err)
                        }
                    })
                })
                this.rejectedBack.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onRejected(this.reason)
                            this.resolvePromise(promoise2,x,resolve,reject)
                        }catch(err){
                            reject(err)
                        }
                    })
                })
            }
            if(this.state == FULFILLED){
                setTimeout(()=>{
                    try{
                        let x = onFulfilled(this.value)
                        this.resolvePromise(promoise2,x,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
                })
            }
            if(this.state == REJECTED){
                setTimeout(()=>{
                    try{
                        let x = onRejected(this.reason)
                        this.resolvePromise(promoise2,x,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
                })
            }
        })
        return promoise2
    }
    resolvePromise(promise,x,resolve,reject){
        if(promise == x){
            return reject(new TypeError('循环引用'))
        }
        if(x != null && (typeof x == 'object' || typeof x == 'function' )){
           let called;
            try{
                let then = x.then
                if(typeof then == 'function'){
                    then.call(x,y=>{
                        if(called)return
                        called=true
                        this.resolvePromise(promise,y,resolve,reject)
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
    static deferred() {
        let dfd = {}
        dfd.promise = new Promise((resolve, reject) => {
            dfd.resolve = resolve
            dfd.reject = reject
        })
        return dfd
    }
}
module.exports=Promise


let p1 = new Promise((resolve,reject)=>{
    resolve( new Promise((resolve,reject)=>{
        resolve(1)
    }))
})
let p2 = p1.then(v=>{
    console.log(v+100)
    return v+100
})
p2.then(value=>{
    console.log(value)
})