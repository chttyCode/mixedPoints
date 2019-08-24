// const co = require('co')
//generator + co 实现async await
let fs = require('fs')
let path = require('path')
function read(url){
    return new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname,url),'utf8',(err,data)=>{
            if(err)reject(err)
            resolve(data)
        })
    })
}
function* fetch(){
    let name = yield read('name.txt')
    let age = yield read(name)
    return name+age
}
function co(it){
    return new Promise((resolve,reject)=>{
        function next(val){
            let {value,done}= it.next(val)
            if(done){
                return resolve(value)
            }
            Promise.resolve(value).then(data=>{
                next(data)
            },reject)
        }
        next()
    })
}

let it= fetch()
// let {value,done}=it.next()
// value.then((data)=>{
//     let {value,done}=it.next(data)
//     value.then(data=>{
//         let {value,done}=it.next(data)
//         console.log(value,done)
//     },err=>{
//         console.log(err)
//     })
// },err=>{
//     console.log(err)
// })
co( fetch()).then(val=>{
    console.log(val)
})