let obj={0:1,1:2,3:4,length:5}

obj[Symbol.iterator]=function(){ //注入迭代器
    let self=this,index=0
    return {
        next(){
            return {value:self[index++],done:index==self.length}
        }
    }
}
obj[Symbol.iterator]=function* (){ //注入迭代器
    let self=this,index=0
    while(index!=self.length){
        yield self[index++]
    }
}

console.log([...obj])
