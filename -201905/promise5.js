let pending = 'pending',
    fulfilled = 'fulfilled',
    rejected = 'rejected',
    obj = 'object',
    fn = 'function'
class Promise {
    constructor(excutor) {
        this.state = pending
        this.value;
        this.reason;
        this.onfulfilledCallback = []
        this.onrejectedCallback = []
        const resolve = (value) => {
            if(value instanceof Promise){
                value.then(resolve,reject)
            }
            if (this.state == pending) {
                this.value = value
                this.state = fulfilled
                this.onfulfilledCallback.forEach(fn => fn())
            }
        }
        const reject = (reason) => {
            if (this.state == pending) {
                this.reason = reason
                this.state = rejected
                this.onrejectedCallback.forEach(fn => fn())
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
            if (this.state == pending) {
                this.onfulfilledCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onfulfilled(this.value)
                            this.resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    })
                })
                this.onrejectedCallback.push(() => {
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
        })
        return promise2
    }
    resolvePromise(promise2, x, resolve, reject) {
        if (x == promise2) {
            return reject(new TypeError('循环引用'))
        }
        if (x !== null && (typeof x == obj || typeof x == fn)) {
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
                reject(er)
            }
        } else {
            resolve(x)
        }
    }
}
let p = new Promise((resolve, reject) => {
    // setTimeout(() => {
    //     console.log(1)
    //     resolve(2)
    // })
    // reject(123)
    // console.log(1)
    // resolve(2)
    resolve(new Promise((resolve,reject)=>{
        resolve(1234)
    }))

})
let p2 = p.then().then((value) => {
    console.log(value + 3)
    // throw new Error('typeerrorr')
}, err => {
    console.log(err + '--err')
})
let p3 = p2.then(value => {
    console.log(value + 'p2')
}, err => {
    console.log(err + 'p2err')
})