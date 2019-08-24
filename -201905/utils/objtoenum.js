export const  objToEnum=(enumValue)=>{
    let result=new Map()
    for(let [key,value] of Object.entries(enumValue)){
        result.set(key,value)
        result.set(value,key)
    }
    return strMapToObj(result)
}