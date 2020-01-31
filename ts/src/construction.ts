//结构系统
/**
 *Duck-Check 目标类型中声明的属性变量在源类型中都存在就是兼容的
 */

//1.接口的兼容
interface Animal{
    name:string;
    age:number;
    gender:number
  }
  
  let a1 = {
    name:'zhufeng',
    age:10,
    gender:0
  }
  
  interface Person{
    name:string;
    age:number
  }
  ////- 要判断目标类型`Person`是否能够兼容输入的源类型`Animal`
  function getName(p:Person):string{
    return p.name;
  }
  getName(a1);
  //只有在传参的时候两个变量之间才会进行兼容性的比较，赋值的时候并不会比较,会直接报错
  let x:Person = {
    name:'zhufeng',
    age:10,
    gender:0
  }
//2. 基本类型的兼容性
//基本数据类型也有兼容性判断
let num : string|number;
let str:string='1';
num = str;

//只要有toString()方法
let num2 : {
  toString():string
}

let str2:string='3';
num2 = str2;
//3.类的兼容
class Animal{
    name:string
}
class Bird extends Animal{
   swing:number
}

let a:Animal;
a = new Bird();

let b:Bird;
//并不是父类兼容子类，子类不兼容父类
b = new Animal();

//4.函数的兼容性 入参可以少，返回值只能多
//4-1比较入参
type sumFunc = (a:number,b:number)=>number;
let sum:sumFunc;
function f1(a:number,b:number){
  return a+b;
}
sum = f1;
//可以省略一个参数
function f2(a:number):number{
   return a;
}
sum = f2;
//可以省略二个参数
function f3():number{
    return 0;
 }
 sum = f3;
 //多一个参数可不行
function f4(a:number,b:number,c:number){
    return a+b+c;
}
sum = f4;
//4-2比较返回值
type GetPerson = ()=>{name:string,age:number};
let getPerson:GetPerson;
//参数一样可以
function g1(){
    return {name:'zhufeng',age:10};
}
getPerson = g1;
//多一个属性也可以
function g2(){
    return {name:'zhufeng',age:10,gender:'male'};
}
getPerson = g2;
//少一个属性不行
function g3(){
    return {name:'zhufeng'};
}
getPerson = g3;
//因为有可能要调用返回值上的方法
getPerson().age.toFixed();
//4-3 函数参数的双向协变
type LogFunc = (a:number|string)=>void;
let log:LogFunc;
function log1(a:number){
  console.log(a);
}
//在这里定义的参数类型兼容实际的参数类型
log = log1;

function log2(a:number|string|boolean){
  console.log(a);
}
//在这里实际的参数类型兼容定义的参数类型
log = log2;

//5 泛型的兼容 泛型在判断兼容性的时候会先判断具体的类型,然后再进行兼容性判断

//接口内容为空没用到泛型的时候是可以的
interface Empty<T>{}
let x:Empty<string>;
let y:Empty<number>;
x = y;

//接口内容不为空的时候不可以
interface NotEmpty<T>{
    data:T
  }
  let x1:NotEmpty<string>;
  let y1:NotEmpty<number>;
  x1 = y1;
  
  interface NotEmptyString{
      data:string
  }
  
  interface NotEmptyNumber{
      data:number
  }
  let xx3:NotEmptyString;
  let yy3:NotEmptyNumber;
  xx3 = yy3;
  //6. 枚举的兼容
  //数字可以赋给枚举
enum Colors {Red,Yellow}
let c:Colors;
c = Colors.Red;
c = 1;
c = '1';

//枚举值可以赋给数字
let n:number;
n = 1;
n = Colors.Red;
export {}