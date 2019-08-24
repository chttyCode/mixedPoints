// 发布 订阅 Pub/Sub
let fs = require('fs')
let path = require('path')
class Pub{
    constructor(){
        this._arr=[]
    }
    addSub(fn){
        this._arr.push(fn)
    }
    emit(...arg){
        this._arr.forEach(fn=>fn(...arg))
    }
}
const newPub=new Pub(),person={}
newPub.addSub((key,value)=>{
    person[key]=value
    if(Object.keys(person).length>=2){
        console.log(person)
        console.log('get person')
    }
})
fs.readFile(path.join(__dirname,'name.txt'),'utf8',(err,data)=>{
    if(err){throw new Error(err)}
    console.log(data)
    newPub.emit('name',data)
})
fs.readFile(path.join(__dirname,'age.txt'),'utf8',(err,data)=>{
    if(err){throw new Error(err)}
    console.log(data)
    newPub.emit('age',data)
})
