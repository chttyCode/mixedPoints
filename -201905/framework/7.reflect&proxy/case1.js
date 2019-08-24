const upDate=()=>{
    console.log('更新视图')
}
//1)负值 Maximum call stack size exceeded 
// let obj={count:1}
// Object.defineProperty(obj,'count',{
//     enumerable:true,
//     configurable:true,
//     get(){
//         return 1
//     },
//     set(value){
//         console.log('setting')
//         obj.count=value //每次负值都会触发set方法
//     }
// })
// obj.count=1
// console.log(obj.count)

//2-1)1.存变量 2.监听不到数组的增删等方法 

// let obj={count:1}
// let other=1;
// Object.defineProperty(obj,'count',{
//     enumerable:true,
//     configurable:true,
//     get(){
//         return other
//     },
//     set(value){
//         other=value //负值给变量，避免调用set方法
//     }
// })
// obj.count=3
// console.log(obj.count)

//2-2)1.闭包 2.监听不到数组的增删等方法 =>对数组的API的原型进行切片编程
// let obj={count:1,a:[2,3,4,5]}
// // let obj=[2,3,4,5]
// const addcontrol=(obj,key,value)=>{//观察对象
//     if(typeof value == 'object')Observer(value)
//     Object.defineProperty(obj,key,{
//         enumerable:true,
//         configurable:true,
//         get(){
//             return value
//         },
//         set(val){
//             if(typeof val == 'object')Observer(val)
//             upDate()
//             value=val
//         }
//     })
// }
// const Observer=(data)=>{
//     for(let key in data){
//         addcontrol(data,key,data[key])
//     }
// }
// let oldFn=Array.prototype.push
// Array.prototype.push=function(...args){
//     oldFn.call(this,...args)
//     Observer(this)
// }
// Observer(obj)
// obj.a.push(23)
// obj.a[4]=234235
// console.log(obj)
//3)Proxy产生新对象代理源对象，源对象的set不会调用代理对象的set,源对象相当于保存数据的对象
let obj={count:1,arr:[1,2,3],c:{a:1}}
// let obj=[1,23,4,5,6] //数组改变自身API会调用set 2次
// let obj2=new Proxy(obj,{
//     get(target,key){
//         return target[key]
//     },
//     set(target,key,value){
//         console.log(arguments)
//         upDate(1)
//         // return target[key]=value //1-1
//         return Reflect.set(target, key, value);//1-2
//     }
// })
// obj2.arr=new Proxy(obj.arr,{
//     get(target,key){
//         return target[key]
//     },
//     set(target,key,value){
//         console.log(arguments)
//         upDate(2)
//         // return target[key]=value //1-1
//         return Reflect.set(target, key, value);//1-2
//     }
// })
// const addcontrol=()=>{

// }
// const Observer=(data)=>{
//     for(let key in data){
//         addcontrol(data,key,data[key])
//     }
// }
// obj2.arr[1]=3
// obj2.c.a=4
// obj2.push(0) //1-1)TypeError: 'set' on proxy: trap returned falsish for property '5' 1-2)ok
// // obj2.length--

// 3-1) proxy this

function deepProxy (obj){
    return new Proxy(obj,{
        get(target,key){
            let value=Reflect.get(target,key)
            if(typeof  value== 'object'){
                return deepProxy(value)
            }
            return value
        },
        set(target,key,value){
            upDate()
            console.log(target,key,value)
            return target[key]=value
        }
    })
}
let obj2=deepProxy(obj)
// obj2.arr[1]=3
obj2.c.a=4
// obj2.push(0) //1-1)TypeError: 'set' on proxy: trap returned falsish for property '5' 1-2)ok
// obj2.length--