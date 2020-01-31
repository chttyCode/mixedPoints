function createIterator(arr) {
    let index=0;
    return {
        next() {
            return index<arr.length?
                {value: arr[index++],done: false}:
                {done:true}
        }
    }
}
let it=createIterator([1,2]);
console.log(it.next());
console.log(it.next());
console.log(it.next());