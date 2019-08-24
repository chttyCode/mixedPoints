//reduce

if (!Array.prototype.reduce) {
    Object.defineProperty(Array.prototype, 'reduce', {
      value: function(callback /*, initialValue*/) {
        if (this === null) {
          throw new TypeError( 'Array.prototype.reduce ' + 
            'called on null or undefined' );
        }
        if (typeof callback !== 'function') {
          throw new TypeError( callback +
            ' is not a function');
        }
  
        // 1. Let O be ? ToObject(this value).
        var o = Object(this);
  
        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0; 
  
        // Steps 3, 4, 5, 6, 7      
        var k = 0; 
        var value;
  
        if (arguments.length >= 2) {
          value = arguments[1];
        } else {
          while (k < len && !(k in o)) {
            k++; 
          }
  
          // 3. If len is 0 and initialValue is not present,
          //    throw a TypeError exception.
          if (k >= len) {
            throw new TypeError( 'Reduce of empty array ' +
              'with no initial value' );
          }
          value = o[k++];
        }
  
        // 8. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kPresent be ? HasProperty(O, Pk).
          // c. If kPresent is true, then
          //    i.  Let kValue be ? Get(O, Pk).
          //    ii. Let accumulator be ? Call(
          //          callbackfn, undefined,
          //          « accumulator, kValue, k, O »).
          if (k in o) {
            value = callback(value, o[k], k, o);
          }
  
          // d. Increase k by 1.      
          k++;
        }
  
        // 9. Return accumulator.
        return value;
      }
    });
  }

Array.prototype.reduce=function(callback){
    let o = Object(this), len = o.length >>> 0, k = 0, value;
    if (arguments.length >= 2) {
        value = arguments[1];
    } else {
        while (k < len && !(k in o)) {
          k++; 
        }
        if (k >= len) {
          throw new TypeError( 'Reduce of empty array ' +
            'with no initial value' );
        }
        value = o[k++];
    }
     while (k < len) {
        if (k in o) {
          value = callback(value, o[k], k, o);
        }
        k++;
      }
      return value;
}


//1)sum
// let obj=[1,2,3,4,5]
// let result=obj.reduce((a,b)=>a+b,4)
// console.log(result)
//2)set
// let obj=[{name:1},{age:3},{address:'js'}]
// let person=obj.reduce((a,b)=>Object.assign(a,b))
// console.log(person)
//map
function a1(name){
    return name
}
function a2(name){
    return '****'+name
}
function a3(name){
    return name+'****'
}
function a4(name){
    return name+'****'+4
}
let fns=[a1,a2,a3]
// let name=a3(     a2(a1('kds'))          ) 
let name=fns.reduce((a,b)=>{
    return (name)=>{
        return b(a(name))
    }
})
// a a1 b a2=>  new=> ()=>a2(a1())
//a new b a3=>  new =>   (name)=>a3( (name)=>a2(a1(name))(name) )

console.log(name('kds'))
// let arr=Object([2,3,5])
let arr=[2,3,5]
arr[6]=10
console.log(2 in arr)