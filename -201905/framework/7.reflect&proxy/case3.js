let obj=[
    { name: 'Firefox', type: 'browser' },
    { name: 'SeaMonkey', type: 'browser' },
    { name: 'Thunderbird', type: 'mailer' }
  ]
// let obj2=new Proxy(obj,{
//     get(target,key){
//         return Reflect.get(target,key)
//     },
//     set(target,key,value){
//         console.log('change')
//         return Reflect.set(target,key,value)
//     }
// })
// let a=obj2[1]
// obj2[1]='kds'
// console.log(a)

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
            console.log('change')
            return target[key]=value
        }
    })
}
obj2=deepProxy(obj)
obj2[0].name='kds'