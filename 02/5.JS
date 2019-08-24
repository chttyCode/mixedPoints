/**
 * generator & iterator
 */

let obj = {0:1,1:2,3:4,length:5}


// obj[Symbol.iterator]=function *(){
//     let index=0
//     while(index<=this.length){
//         yield this[index++]
//     }
// }

obj[Symbol.iterator] = function (){
    let self=this,index=0
    return {
        next(){
            return {value:self[index],done:index++ > self.length}
        }
    }
}


console.log(Array.from(obj))
console.log([...obj])   //   obj is not Iterator




