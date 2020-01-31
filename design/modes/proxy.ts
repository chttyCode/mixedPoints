export {}
abstract class Star {
    abstract answerPhone(): void;
}

class Angelababy extends Star {
    public available: boolean = true;
    answerPhone(): void {
        console.log('你好,我是Angelababy.');
    }
}
class AngelababyAgent extends Star {
    constructor(private angelababy: Angelababy) {
        super();
    }
    answerPhone(): void {
        console.log('你好,我是Angelababy的经纪人.');
        if (this.angelababy.available) {
            this.angelababy.answerPhone();
        }
    }
}
let angelababyAgent = new AngelababyAgent(new Angelababy());
angelababyAgent.answerPhone();
//场景
//1-1 事件代理  window=>document=>html=>body
//1-2 图片代理
//1-3缓存代理 用空间换时间
const factorial = function f(num) {
    if (num === 1) {
        return 1;
    } else {
        return (num * f(num - 1));
    }
}

const proxy = function (fn) {
    const cache = {};  // 缓存对象
    return function (num) {
        if (num in cache) {
            return cache[num];   // 使用缓存代理
        }
        return cache[num] = fn.call(this, num);
    }
}

const proxyFactorial = proxy(factorial);
console.log(proxyFactorial(5));
console.log(proxyFactorial(5));
console.log(proxyFactorial(5));
//1-4 斐波那契数列(Fibonacci sequence)指的是这样一个数列：1、1、2、3、5、8、13、21、34。

//1-4-1
let count_1 = 0;
function fib(n) {
    count_1++;
    return n <= 2 ? 1 : fib(n - 1) + fib(n - 2);
}
var result = fib(10);
console.log(result, count_1);//55 110

//1-4-2
let count_2 = 0;
const fibWithCache = (function () {
    let cache = {};
    function fib(n) {
        count_2++;
        if (cache[n]) {
            return cache[n];
        }
        let result = n <= 2 ? 1 : fib(n - 1) + fib(n - 2);
        cache[n] = result;
        return result;
    }
    return fib;
})();
var result = fibWithCache(10);
console.log(result, count_2);//55 17
//1-5 防抖/节流代理

//1-6 跨域代理
//正向代理 proxy-server
//反向代理 nginx代理跨域 webpack-dev-server代理跨域  客户端代理跨域

// $proxy
function $proxy(fn, context) {
    return function () {
       return fn.call(context, arguments);
    }
}

//es6 proxy
let daughter={
    name: 'daughter',
    age: 29,
    height:165
}
let mother=new Proxy(daughter,{
    get(target,key) {
        if (key == 'age') {
            return daughter.age-1;
        } else if (key == 'height') {
            return daughter.height-5;
        }
        return target[key];
    },
    set(target,key,val) {
        if (key == 'boyfriend') {
            let boyfriend=val;
            if (boyfriend.age>40) {
                throw new Error('太老');
            } else if (boyfriend.salary<20000) {
                throw new Error('太穷');
            } else {
                target[key]=val;
                return true;
            }
        }
    }
});