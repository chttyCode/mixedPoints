//pending, fulfilled, or rejected.
const Pending = 'pending'
const Fulfilled = 'fulfilled'
const Rejected = 'rejected'

class Promise{
    constructor(excutor){
        this.state = Pending
        this.value;
        this.reason;
        this.fulfilledBack=[]
        this.rejectedBack=[]
        const resolve=(value)=>{
            if(value instanceof Promise){
                return value.then(resolve,reject)
            }
            if(this.state == Pending){
                this.state=Fulfilled
                this.value=value
                this.fulfilledBack.forEach(fn=>fn())
            }
        }
        const reject=(reason)=>{
            if(this.state == Pending){
                this.state=Rejected
                this.reason=reason
                this.rejectedBack.forEach(fn=>fn())
            }
        }
        try{
            excutor(resolve,reject)
        }catch(err){
            reject(err)
        }
    }
    then(onFulfilled, onRejected){
        onFulfilled = typeof onFulfilled == 'function'? onFulfilled:value=>value
        onRejected = typeof onRejected == 'function' ? onRejected :err=>{throw err}
        let promise2 = new Promise((resolve,reject)=>{
            if(this.state == Pending){
                this.fulfilledBack.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onFulfilled(this.value)
                            this.resolvePromise(promise2,x,resolve,reject)
                        }catch(err){
                            reject(err)
                        }
                    })
                })
                this.rejectedBack.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onRejected(this.reason)
                            this.resolvePromise(promise2,x,resolve,reject)
                        }catch(err){
                            reject(err)
                        }
                    })
                })

            }
            if(this.state == Fulfilled){
                setTimeout(()=>{
                    try{
                        let x = onFulfilled(this.value)
                        this.resolvePromise(promise2,x,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
                })
            }
            if(this.state == Rejected){
                setTimeout(()=>{
                    try{
                        let x = onRejected(this.reason)
                        this.resolvePromise(promise2,x,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
                })
            }
        })
        return promise2
    }
    resolvePromise(promise2,x,resolve,reject){
        if(promise2 == x ){
            return reject(new TypeError('promise and x refer to the same object'))
        }
        if(x!=null&&(typeof x == 'object' ||  typeof x == 'function')){
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
    race(fns){
        return new Promise((resolve,reject)=>{
            fns.forEach(fn=>Promise.resolve(fn).then(resolve,reject))
        })
    }
    all(fns){
        return new Promise((resolve,reject)=>{
            const result= [],count=0
            ,saveData=(i,value)=>{
                result[i]=value
                count++
                if(count>=fns.length){
                    resolve(resolve)
                }
            }
            fns.forEach((fn,i)=>{
                Promise.resolve(fn).then(value=>{
                    saveData(i,value)
                },reject)
            })
        })
    }
    finally(callback){
        return this.then(value=>{
            return Promise.resolve(callback()).then(()=>value)
        },err=>{
            return Promise.resolve(callback()).then(()=>{throw err})
        })
    }
    static resolve(value){
        return new Promise((resolve,reject)=>{
            resolve(value)
        })
    }
    static deferred(){
        let dfd={}
        dfd.promise= new Promise((resolve,reject)=>{
            dfd.resolve=resolve
            dfd.reject=reject
        })
        return dfd
    }

}
module.exports=Promise