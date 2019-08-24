let arr=[12,42,0,3] // =>[1,0,3,2]

console.log([...Object.keys(arr)].sort((a,b)=>arr[b]-arr[a]))

let arr1=[12,23,[1,3,4,5]]

function flat(arr){
    return [].concat(...arr.map(r=>Array.isArray(r)?flat(r):r))
}
console.log(flat(arr1))
