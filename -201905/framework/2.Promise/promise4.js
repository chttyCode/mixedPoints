const path = require('path')
const fs = require('fs')
let pending = 'pending',
    fulfilled = 'fufilled',
    rejected = 'rejected',
    fn = 'function',
    obj = 'object'

class Promise {
    constructor(excutor) {
        this.state = pending
        this.value;
        this.reason;
        this.fulfilledCallback = []
        this.rejectedCallback = []
        const resolve = (value) => {
            if (value instanceof Promise) {
                return value.then(resolve, reject)
            }
            if (this.state == pending) {
                this.value = value
                this.state = fulfilled
                this.fulfilledCallback.forEach(fn => fn())
            }
        }
        const reject = (value) => {
            if (this.state == pending) {
                this.reason = value
                this.state = rejected
                this.rejectedCallback.forEach(fn => fn())
            }
        }
        try {
            excutor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }
    then(onfulfilled, onrejected) {
        onfulfilled = typeof onfulfilled == fn ? onfulfilled : val => val
        onrejected = typeof onrejected == fn ? onrejected : err => {
            throw err
        }
        let promise2 = new Promise((resolve, reject) => {
            if (this.state == pending) {
                this.fulfilledCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onfulfilled(this.value)
                            this.resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    })
                })
                this.rejectedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onrejected(this.reason)
                            this.resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    })
                })
            }
            if (this.state == fulfilled) {
                setTimeout(() => {
                    try {
                        let x = onfulfilled(this.value)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                })
            }
            if (this.state == rejected) {
                setTimeout(() => {
                    try {
                        let x = onrejected(this.reason)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                })
            }
        })
        return promise2
    }
    catch (onrejected) {
        this.then(null, onrejected)
    }
    static race(fnArr) {
        return new Promise((resolve, reject) => {
            fnArr.forEach(fn=> {
                fn.then(resolve,reject)
            })
        })
    }
    static all(fnArr) {
        let result=[],count=0
        return new Promise((resolve,reject)=>{
            const saveData=(data,i)=>{
                result[i]=data
                count++
                if(count>=fnArr.length){
                    return resolve(result)
                }
            }
            fnArr.forEach((fn,i)=>{
                Promise.resolve(fn).then(data=>{
                    saveData(data,i)
                },reject)
            })
        })
    }
    finally(callback) {//始终都会执行与状态无关
        return this.then(value=>{
            return Promise.resolve(callback()).then(()=>value)
        },err=>{
           return Promise.resolve(callback()).then(()=>{throw err})
        })
    }
    resolvePromise(promise2, x, resolve, reject) {
        if (promise2 == x) {
            return reject(new TypeError('循环引用'))
        }
        if (x != null && (typeof x == obj || typeof x == fn)) {
            let called;
            try {
                let then = x.then
                if (typeof then == fn) {
                    then.call(x, y => {
                        if (called) return
                        called = true
                        this.resolvePromise(promise2, y, resolve, reject)
                    }, err => {
                        if (called) return
                        called = true
                        reject(err)
                    })
                } else {
                    resolve(x)
                }
            } catch (err) {
                if (called) return
                called = true
                reject(err)
            }
        } else {
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
    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value)
        })
    }
}
module.exports = Promise

function dfd(name){
    let dfd=Promise.deferred()
    fs.readFile(path.join(__dirname,'..',name),'utf8',(err,data)=>{
        if(err)return dfd.reject(err)
        dfd.resolve(data)
    })
    return dfd.promise
}
let p1 = Promise.all([dfd('name.txt'),dfd('age.txt'),1,2,3])
p1.finally(()=>{
    console.log('finally1')
}).then(val => {
    console.log(val)
},err=>{
    console.log(err)
}).finally(()=>{
    console.log('finally2')
})

let p2 = new Promise((resolve,reject)=>{
    resolve(new Promise((resolve,reject)=>{
        resolve(3)
    }))
})
let p3=p1.then(value=>{
    return new Promise((resolve,reject)=>{
        resolve(value+1)
    })
},err=>{
    console.log(err+'--')
})
let p4=p2.then(value=>{
    console.log(value)
},err=>{
    console.log(err+'--')
})

dfd('name.txt').then(value=>{
    console.log(value)
},err=>{
    console.log(err+'fs')
})
dfd('name1.txt').catch(err=>{
    console.log(err+'fs2')
})