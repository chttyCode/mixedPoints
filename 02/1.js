let fs = require('fs')
let path = require('path')

function read(file){
    fs.readFile(path.join(__dirname,file),'utf-8',(err,data)=>{
        sentry(file,data)
    })
}
function fetchMsg(params){
    console.log(params)
    console.log('fetch params')
}
const result={};
function sentry(key,value) {
    result[key] = value
    if(Object.keys(result).length>=2){
        fetchMsg(result)
    }
}
read('tel.txt')
read('ad.txt')