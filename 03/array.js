// concat()
Array.prototype.concat=function(...arg){
    let self=this,value=new Array()
    value=[...self]
    arg.forEach(item=>{
        if(Array.isArray(item)){
            value=[...value,...item]
        }else{
            value.push(item)
        }
    })
    return value
}
// entries()
Array.entries=function(){
    let self=this,index=0
    return {
        next(){
            return {value:self[index],done:index++==self.length}
        }
    }
}
Array.entries=function* (){
    let self=this,index=0
    while(index++!=self.length){
        yield self[index]
    }
}
let a=['kds','age']
a.entries()
function co(it){
    function next(it){
        let {value,done}=it.next()
        if(done){
            return value
        }
        console.log(value,done)
        next(it)
    }
    next(it)
}
// let r=co(a.entries())
// every()
Array.prototype.every=function(fn){
    let self=this,index=0
    while((fn.call(self,self[index],index,self)&&index++<self.length)){
        if(index==self.length-1){
            return true
        }
    }
    return false
}
Array.prototype.every=function(fn){
    let self=this
    for(let i=0;i<self.length;i++){
        if(!fn.call(self,self[i],i,self)){
            return false
        }
    }
    return true
}

// let b=[2,3,4,5]
// let result=b.every((val,i,arr)=>{
//     return val>1
// })
// console.log(result)

// filter()

Array.prototype.filter=function(fn){
    let self=this,arr=[]
    for(let i=0;i<self.length;i++){
        fn.call(self,self[i],i,self)&&arr.push(self[i])
    }
    return arr
}

let r=[1,2,3,4,5].filter(v=>v>3)
// console.log(r)
// find()

// findIndex()
// flat()
function flat(arr){
    return [].concat(...arr.map(item=>Array.isArray(item)?flat(item):item))
}
Array.prototype.flat=function(){
    let self=this
    function flat(arr){
        return [].concat(...arr.map(item=>Array.isArray(item)?flat(item):item))
    }
    return flat(self)
}
// var g=[1,2,[3,4,[5,6]]]
// var gr=g.flat()
// console.log(gr)
// flatMap()
// forEach()
// includes()
// indexOf()
// join()
// keys()
// lastIndexOf()
// map()
// pop()
// push()
// reduce()
Array.prototype.reduce=function(...arg){
    let self=this,fn=arg[0],result=arg[1],index=0
    if(!result){
        result=self[index++]
    }
    while(self[index]){
        result=fn.call(self,result,self[index++])
    }
    return result
}
// reduceRight()
// reverse()
// shift()
// slice()
// some()
// sort()
// splice()
// toLocaleString()
// toString()
// unshift()
// values()
// Symbol(Symbol.iterator)()
// Symbol(Symbol.unscopables)
