/*
 * @Author: kongds
 * @Date: 2019-08-18 14:29:37
 */
//              (?!^[0-9]{3}$)^[0-9A-Za-z]{3}$
let str='123456'.replace(/(?![0-9]{3,6})/g,'#')
let str2='123456'.replace(/(?!^[0-9]{3,6}$)/g,'#')




let str22='123456'.replace(/(?=[0-9]{3,6})/g,'#')
let str222='123456'.replace(/(?=^[0-9]{3,6})/g,'#')





let str3='123456'.replace(/(?![0-9]{3,6}$)/g,'#')
let str4='123456'.replace(/(?!^[0-9]{3,6}$)/g,'#')
console.log(str)
console.log(str2)
// console.log(str22)
// console.log(str222)
// console.log(str3)
// console.log(str4)