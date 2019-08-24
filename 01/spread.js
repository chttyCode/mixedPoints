import { fstat } from "fs";

//类数组对象 有索引 有长度(length)的对象 
let obj = {0:1,1:2,3:4,length:5}

//手写遍历器
// obj[Symbol.iterator]=function(){
//     let self=this,index=0
//     return {
//         next(){
//             return {done:index>self.length,value:self[index++]}
//         }
//     }
// }
//迭代器
obj[Symbol.iterator]=function * (){
    let self=this,index=0
    while(index<=self.length){
        yield self[index++]
    }
}

let gen=function * (){
    let index=0
    while(index<=2){
        console.log(index)
        yield index++
    }
}


// let it=gen()
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(Array.from(obj))
// console.log([...obj])



let p1 = new Promise((resolve,reject)=>{
    resolve( new Promise((resolve,reject)=>{
        resolve(1)
    }))
})
let p2 = p1.then(v=>{
    console.log(v+100)
    return v+100
})
p2.then(value=>{
    console.log(value)
})
