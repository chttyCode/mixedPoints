const fs= require('fs')
const path=require('path')

function read (name){
    console.log(name)
    return new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname,name),'utf8',(err,data)=>{
            if(err)return reject(err)
            resolve(data)
        })
    })
}
// async function readBatch(){
//     let name= await read('name.txt')
//     let age= await read('age.txt')
//     return name+age
// }
// readBatch().then(val=>{
//     console.log(val)
// })

function * readBatchGenrator (){
    let name= yield read('name.txt')
    let age= yield read('age.txt')
    return name+age
}
let it=readBatchGenrator()

// let {value,done}=it.next()
// value.then(name=>{
//     let {value,done}=it.next(name)
//     value.then(age=>{
//         console.log(age)
//         let result=it.next(age)
//         console.log(result)
//     })
// })

function co(it){
    return new Promise((resolve,reject)=>{
        function next(val){
            let {value,done}=it.next(val)
            if(done){
                return resolve(value)
            }
            value.then(value=>{
                next(value)
            })
        }
        next()
    })
}

let asyncGenrator=co(readBatchGenrator())
asyncGenrator.then(value=>{
    console.log(value)
})