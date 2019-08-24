const path = require('path')
const fs =require('fs')
function read(){
    return new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname,'name.txt'),'utf-8',(err,data)=>{
            if(err){
                return reject(err)
            }
            resolve(data)
        })
    })
}

async function a(){
    console.log(2)
    let c= await read()
    console.log(c)
}
function b(){
    console.log(1)
}
function it(){
    a()
    b()
}
it()