 //注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”
 function sum(x, y) {
    if (y > 0) {
      return sum(x + 1, y - 1);
    } else {
      return x;
    }
  }