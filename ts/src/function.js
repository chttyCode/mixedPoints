"use strict";
exports.__esModule = true;
//函数
//函数声明
function hellodeclaraltion(name) {
    console.log('declaration', name);
    return name;
}
hellodeclaraltion('declaration');
var hellodefined = function (name) {
    console.log('declaration', name);
    return name;
};
//函数定义无返回值
function hellodeclaraltion2(name) {
    console.log('declaration', name);
}
hellodeclaraltion2('declaration');
var hellodefined2 = function (name) {
    console.log('declaration', name);
    return name;
};
var hellodefined3 = function (name) {
    console.log('hello2', name);
};
hellodefined2('defined');
//可选参数 必须为最优一个参数
var hellodefined4 = function (name, y) {
    console.log('declaration', name);
    return name;
};
hellodefined4('function');
//默认参数
var hellodefined5 = function (name, y, z) {
    if (y === void 0) { y = 1; }
    console.log('declaration', name);
    return name;
};
hellodefined5('function');
//剩余参数
function sum() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (val, item) { return val += item; }, 0);
}
console.log(sum(1, 2, 3));
//重载  java中的重载是指两个或者两个以上的同名函数,参数不一样，ts中是指为同一个函数提供多个函数类型定义 
var obj = {};
function attr(val) {
    if (typeof val === 'number') {
        obj.age = val;
    }
    else {
        obj.name = val;
    }
}
attr('zfpx');
attr(9);
console.log(obj);
