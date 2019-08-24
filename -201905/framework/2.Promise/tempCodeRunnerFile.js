let pending = 'pending',
//     fulfilled = 'fufilled',
//     rejected = 'rejected',
//     fn = 'function',
//     obj = 'object'

// class Promise {
//     constructor(excutor) {
//         this.state = pending
//         this.value;
//         this.reason;
//         this.fulfilledCallback = []
//         this.rejectedCallback = []
//         const resolve = (value) => {
//             if (value instanceof Promise) {
//                 return value.then(resolve, reject)
//             }
//             if (this.state == pending) {
//                 this.value = value
//                 this.state = fulfilled
//                 this.fulfilledCallback.forEach(fn => fn())
//             }
//         }
//         const reject = (value) => {
//             if (this.state == pending) {
//                 this.reason = value
//                 this.state = rejected
//                 this.rejectedCallback.forEach(fn => fn())
//             }
//         }
//         try {
//             excutor(resolve, reject)
//         } catch (err) {
//             reject(err)
//         }
//     }
//     then(onfulfilled, onrejected) {
//         onfulfilled = typeof onfulfilled == fn ? onfulfilled : val => val
//         onrejected = typeof onrejected == fn ? onrejected : err => {
//             throw err
//         }
//         let promise2 = new Promise((resolve, reject) => {
//             if (this.state == pending) {
//                 this.fulfilledCallback.push(() => {
//                     setTimeout(() => {
//                         try {
//                             let x = onfulfilled(this.value)
//                             this.resolvePromise(promise2, x, resolve, reject)
//                         } catch (err) {
//                             reject(err)
//                         }
//                     })
//                 })
//                 this.rejectedCallback.push(() => {
//                     setTimeout(() => {
//                         try {
//                             let x = onrejected(this.reason)
//                             this.resolvePromise(promise2, x, resolve, reject)
//                         } catch (err) {
//                             reject(err)
//                         }
//                     })
//                 })
//             }
//             if (this.state == fulfilled) {
//                 setTimeout(() => {
//                     try {
//                         let x = onfulfilled(this.value)
//                         this.resolvePromise(promise2, x, resolve, reject)
//                     } catch (err) {
//                         reject(err)
//                     }
//                 })
//             }
//             if (this.state == rejected) {
//                 setTimeout(() => {
//                     try {
//                         let x = onrejected(this.reason)
//                         this.resolvePromise(promise2, x, resolve, reject)
//                     } catch (err) {
//                         reject(err)
//                     }
//                 })
//             }
//         })
//         return promise2
//     }
//     catch (onrejected) {
//         this.then(null, onrejected)
//     }
//     race(fnArr) {
//         let result = []
//         return new Promise((resolve, reject) => {
//             fnArr.forEach((fn, i) => {

//             })
//         })
//     }
//     all(fnArr) {

//     }
//     finally() {}
//     resolvePromise(promise2, x, resolve, reject) {
//         if (promise2 == x) {
//             return reject(new TypeError('循环引用'))
//         }
//         if (x != null && (typeof x == obj || typeof x == fn)) {
//             let called;
//             try {
//                 let then = x.then
//                 if (typeof then == fn) {
//                     then.call(x, y => {
//                         if (called) return
//                         called = true
//                         this.resolvePromise(promise2, y, resolve, reject)
//                     }, err => {
//                         if (called) return
//                         called = true
//                         reject(err)
//                     })
//                 } else {
//                     resolve(x)
//                 }
//             } catch (err) {
//                 if (called) return
//                 called = true
//                 reject(err)
//             }
//         } else {
//             resolve(x)
//         }
//     }
//     static deferred() {
//         let dfd = {}
//         dfd.promise = new Promise((resolve, reject) => {
//             dfd.resolve = resolve
//             dfd.reject = reject
//         })
//         return dfd
//     }
//     static resolve(value) {
//         return new Promise((resolve, reject) => {
//             resolve(value)
//         })
//     }
// }
// module.exports = Promise