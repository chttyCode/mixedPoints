let fs = require('fs')
let path = require('path')

class Pub{
    constructor(){
        this.subs=[]
    }
    addSub(fn){
        this.subs.push(fn)
    }
    nodity(...arg){
        this.subs.forEach(fn=>fn(...arg))
    }
}

function read(file){
    fs.readFile(path.join(__dirname,file),'utf-8',(err,data)=>{
        getMsg.nodity(file,data)
    })
}
function fetchMsg(params){
    console.log(params)
    console.log('fetch params')
}
const getMsg=new Pub(),result={}

getMsg.addSub((key,value)=>{
    result[key] = value
    if(Object.keys(result).length>=2){
        fetchMsg(result)
    }
})
read('tel.txt')
read('ad.txt')