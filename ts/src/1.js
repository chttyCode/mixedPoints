"use strict";
exports.__esModule = true;
//1 boolean
var a = true;
//2 number
var b = 1;
//3 string
var c = '1';
//4 array
var d = [1, 2, 3, 4];
var e = [1, 2, 3, 5];
//5 tuple
var f = ['1', { a: 1 }];
//6 enum 数字类型的enum具有反向映射功能,字符串不具备反向映射
var status;
(function (status) {
    status[status["success"] = 99] = "success";
    status[status["error"] = 100] = "error";
})(status || (status = {}));
var status1;
(function (status1) {
    status1["success"] = "99";
    status1["error"] = "1000";
})(status1 || (status1 = {}));
console.log(99 /* success */);
//8 神奇 any
var body = document.documentElement;
//9 null&undefined 是其他类型的子类型 strictNullChecks json 中配置是否看起null的严格检查
function fn(x) {
    if (typeof x === 'number') {
        // x: number 类型
    }
    else if (typeof x === 'string') {
        // x: string 类型
    }
    else {
        // x: never 类型
        // --strictNullChecks 模式下，这里的代码将不会被执行，x 无法被观察
    }
}
//10 void 表示没有任何类型 
//11 never 表示不会出现的值  void 可以被赋值为 null 和 undefined的类型。 never 则是一个不包含值的类型
//12 类型推论 1.初始未负值被推论为any 2. 初始负值会被推论为赋值类型
//13 包装类型对象:js数据类型被分为原始类型和引用类型;原始类型没有属性，使用时会有一次包装或者装箱的动作
/**
 * 原始类型: 1. Symbol
 */
//14联合类型 即多个类型中的某一个类型，所以只能访问多个类型的共有属性
var g;
g = 'test';
console.log(g);
var h = 1;
//字符串字面量vs联合类型 1.字符串字面量只能取具体的某几个字符串，但是联合类型确是其中某几种类型
