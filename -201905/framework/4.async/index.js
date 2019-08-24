const fs= require('fs')
const path=require('path')

function read (name){
    return new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname,'..',name),'utf8',(err,data)=>{
            if(err)return reject(err)
            resolve(data)
        })
    })
}
async function readBatch(){
    let name= await read('name.txt')
    let age= await read('age.txt')
    return name+age
}
readBatch().then(val=>{
    console.log(val)
})