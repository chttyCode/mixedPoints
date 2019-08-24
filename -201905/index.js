function flat1(arr){
    let result =arr.map(val=>{
        let a=Array.isArray(val)?flat1(val):val
        return a
    })
    console.log([].concat(...result))
    return [].concat(...result)
}
let result=flat1([[3,4,5],6,7])
console.log(result)