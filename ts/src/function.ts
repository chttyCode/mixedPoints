//函数
//函数声明
function hellodeclaraltion(name:string):string {
    console.log('declaration',name);
    return name
}
hellodeclaraltion('declaration');
//函数定义
type hellodefinedtype=(x:string)=>string;
let hellodefined:hellodefinedtype= function(name){
    console.log('declaration',name);
    return name
}
//函数定义无返回值

function hellodeclaraltion2(name:string):void {
    console.log('declaration',name);
}
hellodeclaraltion2('declaration');
type hellodefinedtype2=(x:string)=>void;
let hellodefined2:hellodefinedtype2= function(name){
    console.log('declaration',name);
    return name
}
let hellodefined3 = function (name:string):void {
    console.log('hello2',name);
}
hellodefined2('defined')

//可选参数 必须为最优一个参数
let hellodefined4= function(name:string,y?:number):string{
    console.log('declaration',name);
    return name
}
hellodefined4('function')

//默认参数
let hellodefined5= function(name:string,y:number=1,z?:number):string{
    console.log('declaration',name);
    return name
}
hellodefined5('function')
//剩余参数
function sum(...numbers:number[]) {
    return numbers.reduce((val,item)=>val+=item,0);
}
console.log(sum(1,2,3));

//重载  java中的重载是指两个或者两个以上的同名函数,参数不一样，ts中是指为同一个函数提供多个函数类型定义 

let obj: any={};
function attr(val: string): void;
function attr(val: number): void;
function attr(val:any):void {
    if (typeof val === 'number') {
        obj.age=val;
    } else {
        obj.name=val;
    }
}
attr('zfpx');
attr(9);
console.log(obj);
export {}