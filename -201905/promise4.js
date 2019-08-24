let pending='pengding',fulfilled='fulfilled',rejected='rejected',fn='function',obj='object'
function resolvePromise(promise2,x,resolve,reject){
    if(promise2 == x){
        return reject(new TypeError('循环引用'))
    }
    if(x!=null&&(typeof x == obj || typeof x == fn)){
        let called;
        try{
            let then= x.then
            if(typeof x == fn){
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
class Promise{
    constructor(excutor){
        this.state=pending
        this.value;
        this.reason;
        this.onfulfilledCallback=[]
        this.onrejectedCallback=[]
        const resolve=(value)=>{
            if(value instanceof Promise){
                return value.then(resovle,reject)
            }
            if(this.state==pending){
                this.value=value
                this.state=fulfilled
                this.onfulfilledCallback.forEach(fn=>fn())
            }
        }
        const reject=(err)=>{
            if(this.state==rejected){
                this.state=rejected
                this.reason=err
                this.onrejectedCallback.forEach(fn=>fn())
            }
        }
        try{
            excutor(resolve,rejecet)
        }catch(err){    
            reject(err)
        }
    }
    then(onfulfilled,onrejected){
        onfulfilled = typeof onfulfilled == fn ?onfulfilled:val=>val
        onrejected=typeof onrejected == fn ? onrejected :er  =>{throw err}
        let promise2 = new Promise((resovle,reject)=>{
            if(this.state == pending){
                this.onfulfilledCallback.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x =onfulfilled(this.value)
                            resolvePromise(promise2,x,resovle,reject)
                        }catch(err){
                            reject(err)
                        }
                    })
                })
                this.onrejectedCallback.push(()=>{
                   setTimeout(()=>{
                       try{
                        let x = onrejected(this.reason)
                        resolvePromise(promise2,x,resovle,reject)
                       }catch(err){
                           reject(er)
                       }
                   })
                })
            }
            if(this.state == fulfilled){
                setTimeout(()=>{
                    try{
                        let x =onfulfilled(this.value)
                        resolvePromise(promise2,x,resovle,reject)
                    }catch(err){
                        reject(err)
                    }
                })
            }
            if(this.state == rejected){
                setTimeout(()=>{
                    try{
                     let x = onrejected(this.reason)
                     resolvePromise(promise2,x,resovle,reject)
                    }catch(err){
                        reject(er)
                    }
                })
            }
        })
        return promise2
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