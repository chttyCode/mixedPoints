function f1(a){
    console.log(1)
    return a+1
}
function f2(a){
    console.log(2)
    return a+2
}
function f3(a){
    console.log(3)
    return a+3
}
let fn=[f1,f2,f3].reduce((a,b)=>{
    return (arg)=>{
        a(b(arg))
    }
})
console.log(fn)
fn(0)
