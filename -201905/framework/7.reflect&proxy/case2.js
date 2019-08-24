//1.需要变量存储值  definedProperty 
//
let obj={}
// Object.defineProperty(obj,'name',{
//     enumerable:true,
//     configurable:true,
//     get(){
//         return Reflect.get(obj,'name')
//     },
//     set(value){
//         Reflect.get(obj,'name',value)
//     }
// })
var obj2 = new Proxy(obj, {
    get: function (target, key, receiver) {
        console.log(`getting ${key}!`);
        // return Reflect.get(target, key, receiver);
        return target[key]
    },
    set: function (target, key, value, receiver) {
        console.log(`setting ${key}!`);
        target[key]=value
        // return Reflect.set(target, key, value, receiver);
    }
});
    obj2.count = 1
    //  setting count!
    // ++obj2.count
    //  getting count!
    //  setting count!
    //  2
// console.log(obj2.count)

