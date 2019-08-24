const fs =  require('fs')
const path= require('path')
const Promise = require('./promise2')
function fetchPerson(){
    return new Promise((resolve,reject)=>{
        fs.readFile(path.resolve(__dirname,'age.txt'),'utf8',(err,data)=>{
            if(err)console.log(err)
            console.log(2)
            resolve(data)
        })
        console.log('立即执行')
    })
}
const value = fetchPerson()
console.log(value)