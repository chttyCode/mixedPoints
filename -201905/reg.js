var a='10007-10008'.replace(/(\d{4,})-(\d{2,})/,'10001-$1')
// var a='10007-10008'.replace(/([\d]+)(?=-)/,'10001-$1')
console.log(RegExp.$1)
console.log(a)
// function thousandReg(str) {
//     // let reg=/(?=\d{3}$)/g
//     str += ''
//     let regSplite = /^([\d]*)\.?([\d]*)$/,
//         regInit = /(?!^)(?=(\d{3})+$)/g,//先行断言
//         regDigit = /(?!$)(?<=^(\d{3})+)/g,//后行断言
//         integer = str.replace(regSplite, '$1'),
//         point = str.replace(regSplite, '$2'),
//         number = []


//     integer = integer && number.push(integer.replace(regInit, ','))
//     point = point && number.push(point.replace(regDigit, ','))
//     return number.join('.')
// }
// console.log(thousandReg('10002'))

var string = "2017-2018";
var result = string.replace(/(\d{4})-(\d{2})/, "$1");
console.log(result)

let map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0
console.log(map)