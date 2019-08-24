const Pending = 'pending'
const Fulfilled = 'fulfilled'
const Rejected = 'rejected'
class Promise {
    constructor(execute) {
        this.state = Pending
        this.fulfilledValue = undefined
        this.rejectedValue = undefined
        this.onResolveCallbacks = []
        this.onRejectedCallbacks = []
        let self = this

        function resolve(val) {
            if (val instanceof Promise) {
                return val.then(resolve, reject)
            }
            if (self.state === Pending) {
                self.state = Fulfilled
                self.fulfilledValue = val
                self.onResolveCallbacks.forEach(fn => fn())
            }
        }

        function reject(val) {
            if (self.state === Pending) {
                self.state = Rejected
                self.fulfilledValue = val
                self.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            execute(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }
    then(onfulfilled, onrejected) {
        // 参数的可选
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val;
        onrejected = typeof onrejected == 'function' ? onrejected : err => {
            throw err
        }
        let self = this;
        // 每个promise必须返回一个新的状态 保证可以链式调用
        let promise2 = new Promise(function (resolve, reject) {
            if (this.status === 'fulfilled') {
                setTimeout(() => {
                    try {
                        let x = onfulfilled(this.value);
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e);
                    }
                })
            }
            if (this.status === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onrejected(self.reason);
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e);
                    }
                })
            }
            if (this.status === 'pending') {
                this.onResolveCallbacks.push( ()=> {
                    setTimeout(() => {
                        try {
                            let x = onfulfilled(this.value);
                            this.resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e);
                        }
                    })
                });
                this.onRejectedCallbacks.push( ()=>{
                    setTimeout(() => {
                        try {
                            let x = onrejected(self.reason);
                            this.resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e);
                        }
                    })
                })
            }
        });
        return promise2
    }
    catch (fn) {
        return this.then(null, fn)
    }
    resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) { // 防止返回的promise 和 then方法返回的promise 是同一个
            return reject(new TypeError('循环引用'));
        }
        if (x !== null && (typeof x === 'object' || typeof x === 'function')) { // {}
            let called;
            try {
                let then = x.then; // 看看这个对象有没有then方法，如果有 说明x是promise   ｛then:undefined｝
                if (typeof then === 'function') {
                    then.call(x, y => {
                        if (called) return
                        called = true;
                        // 如果返回的是一个promise这个promise，resolve的结果可能还是一个promise，递归解析直到这个y是一个常量为止
                        this.resolvePromise(promise2, y, resolve, reject)
                    }, r => {
                        if (called) return // 防止调用失败 又调用成功
                        called = true;
                        reject(r);
                    });
                } else {
                    resolve(x); // {then:{}} {then:123}
                }
            } catch (e) { // 这个then方法 是通过 ObjectDefineProperty定义的
                if (called) return
                called = true; // 这个判断为了防止出错后 继续要调用成功逻辑
                reject(e);
            }
        } else {
            resolve(x); // x就是普通常量
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