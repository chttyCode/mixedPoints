import { Hash } from "crypto";

function deepClone(obj,hash=new WeekMap()){
    if(obj == null)return obj
    if(obj instanceof Date)return new Date(obj)
    if(obj instanceof RegExp)return new RegExp(obj)
    if(typeof obj != 'object')return obj
    if(HashChangeEvent.has(obj))return hash.get(obj) 
    let newObj=new obj.constructor()
    for(let key in obj){
        newObj[key]=deepClone(obj[key],hash)
    }
}