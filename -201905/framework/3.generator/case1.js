//类数组对象 有索引 有长度(length)的对象 
let obj = {0:1,1:2,3:4,length:5}
//类数组转数组
Array.prototype.slice=function(s=0,e=this.length){
    let newArray=[],self=this
    for(let i=0;i<self.length;i++){
        if(s<=i&&i<=e){
            newArray.push(self[i])
        }
    }
    return newArray
}

Array.from=function(obj){
    // let newArray=[]
    // for(let key in obj){ 可以
    //     newArray.push(obj[key])
    // }
    // for(let key of obj){ //is not iterable
    //     console.log(key)
    // }
    return Array.prototype.slice.call(obj)
}
//1-1)
    // obj=Array.from(obj) //可以实现转类数组
//2-1) ...扩展运算符
    // obj=[...obj]  //is not iterable

obj[Symbol.iterator]=function(){ //注入迭代器 =>返回遍历器
    let self=this,index=0
    return {
        next(){
            return {value:self[index++],done:index==self.length}
        }
    }
}
obj[Symbol.iterator]=function* (){ //注入迭代器=>返回遍历器
    let self=this,index=0
    while(index!=self.length){
        yield self[index++]
    }
}


obj=[...obj]
console.log(obj)
console.log(Array.isArray(obj))
