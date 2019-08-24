let isType=function(type){
    return function(obj){
        return toString.call(obj)==`[object ${type}]`
    }
}
let isString=isType('String')()
let isFunction=isType('Function')()
console.log(isString,isFunction)