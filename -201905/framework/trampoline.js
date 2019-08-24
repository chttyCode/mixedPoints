/*
上面就是蹦床函数的一个实现，它接受一个函数f作为参数。
只要f执行后返回一个函数，就继续执行。
注意，这里是返回一个函数，然后执行该函数，而不是函数里面调用函数，这样就避免了递归执行，从而就消除了调用栈过大的问题。
*/
function trampoline(f) {
    while (f && f instanceof Function) {
      f = f();
    }
    return f;
}
function sum(x, y) {
    if (y > 0) {
      return ()=>sum(x + 1, y - 1); // Maximum call stack size exceeded
    // return sum.bind(null, x + 1, y - 1); //100001
    } else {
      return x;
    }
  }
  
 let value= trampoline(sum(1, 100000))
 console.log(value)