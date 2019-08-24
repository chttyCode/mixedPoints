//...扩展运算符 浅克隆 只拷贝一层
//Object.assign 
    //继承属性和不可枚举属性是不能拷贝的
    //异常会打断后续拷贝任务

function deepClone(obj,hash=new WeakMap()){
    if(obj == null)return obj
    if(obj instanceof RegExp)return new RegExp(obj)
    if(obj instanceof Date)return new Date(obj)
    if(typeof obj!= 'object')return obj
    if(hash.has(obj))return hash.get(obj)
    let cloneobj=new obj.constructor()
    hash.set(obj,cloneobj)
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            cloneobj[key]=deepClone(obj[key],hash)
        }
    }
    return cloneobj
}
let my={name:'js',id:'1',address:{name:'js',id:2},fn:()=>123}
my.xxx=my
let obj1={...my} 
let obj2=Object.assign({},my)
let obj3=deepClone(my)
my.address.id='1'
// console.log(obj3.address == my.address)
// console.log(obj2)
console.log(obj3)