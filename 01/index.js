// 异步间如何拆分逻辑 发布订阅
// 多个异步如何串行
let Promise=require('./promise')
let a=10
let p1 = new Promise((resolve,reject)=>{
    resolve(new Promise((resolve,reject)=>{
        resolve(1)
    }))
})
let p2=p1.then(value=>{
    console.log(value)
    return value+10
})
console.log(p2)
p2.then(v=>{
    console.log('-------------')
    console.log(v)
})