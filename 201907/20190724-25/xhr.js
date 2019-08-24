//切片式模式+装饰器模式
let p1=new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve('p1 is load')},1000)
})
let p2=new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve('p2 is load')},2000)
})
let p3=new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve('p3 is load')},3000)
})
//发布订阅模式 & 哨兵模式

// 观察者模式

//异步解决方案
/**
 * callback -> promise -> generator -> async + await
 * 1.async/await 函数的实现，就是将 Generator 函数和自动执行器，包装在一个函数里。
 * 
 */