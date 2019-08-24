function flat1(arr){
    let result =arr.map(val=>{
        let a=Array.isArray(val)?flat1(val):val
        return a
    })
    return [].concat(...result)
}
// let result=flat1([[3,4,5],6,7])
console.log([].concat())
console.log(...[1,2,3,4,[7,8,9,10,11]])