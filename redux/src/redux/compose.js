function fn1(arg){
    return 1+arg
}
function fn2(arg){
    return 2+arg
}
function fn3(arg){
    return 3+arg
}
function compose(...fns){
    return fns.reduce((a,b)=>(...args)=>a(b(...args)))
}
/**
 * 第一次执行 a = fn3   b = fn2   =>   (...args)=>fn3(fn2(...args))
 * 第一次执行 a =  (...args)=>fn3(fn2(...args))   b = fn1   =>  (...args)=>a(fn1(...args))
 */

let fns=compose(fn1,fn2,fn3)  //fns  =  (...args)=>(fn1(...args))=>fn3(fn2(fn1(...args)))

export default function(){}