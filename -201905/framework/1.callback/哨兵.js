// 哨兵模式=>计数器
const fs = require('fs')
const path = require('path')
function ajax(file){
    fs.readFile(path.join(__dirname,file),'utf8',(err,data)=>{
        if(err) throw new Error(err)
        console.log(data)
        sentry(file,data)
        return data
    })
}
//get到名称和年龄，发起请求
const info={}
const sentry=function(key,value){
    info[key]=value
    if(Object.keys(info).length>=2){
        console.log(info)
        console.log('发起请求')
    }
}
ajax('name.txt')
ajax('age.txt')