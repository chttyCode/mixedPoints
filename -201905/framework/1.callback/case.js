
let p=new Promise((resolve,reject)=>{
    resolve(10)
})
let p2=p.then(()=>{
    return p2
})