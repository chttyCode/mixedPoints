//Iterator Generator async
//遍历器对象
let next=()=>{
    return {
        next(){
            return {done:true,value:'1'}
        }
    }
}
//Generator
function * g(v){
    let a = yield Promise.resolve(1)
    let b = yield Promise.resolve(a)
    return a+b
}
// let it = g()
// it.next(1)
// it.next(2)
// it.next(3)

//async 
async function ync(){
    let a = await Promise.resolve()
    let b = await Promise.resolve(a)
    return a+b
}
// ync()

let obj = {0:1,1:2,3:4,length:5}

obj[Symbol.iterator]=function(){
    let self=this,index=0
    return {
        next(){
            return {value:self[index++],done:index>=self.length}
        }
    }
}

obj[Symbol.iterator]=function* (){
    let self=this,index=0
    while(index<self.length-1){
        yield self[index++]
    }
}

// console.log({...obj})
// console.log([...obj])


//实现async+await

function co(it){
    return new Promise((resolve,reject)=>{
        function next(v){
            let {value,done} = it.next(v)
            if(done)return resolve(value)
            Promise.resolve(value).then(val=>{
                next(val)
            })
        }
        next()
    })
}
co(g()).then(res=>{
    console.log(res)
})