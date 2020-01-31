//数据类型
//1 boolean

let a:boolean=true

//2 number

let b:number=1

//3 string

let c:string='1'

//4 array

let d:number[]=[1,2,3,4]
let e:Array<number>=[1,2,3,5]

//5 tuple

let f:[string,object]=['1',{a:1}]


//6 enum 数字类型的enum具有反向映射功能,字符串不具备反向映射

enum status{
    success=99,
    error=100
}
enum status1{
    success='99',
    error='1000'
}

//7 常量枚举 编译阶段会被删除，若不需方向映射，尽量使用常量枚举
const enum fetchStatue{
    success=99,
    error=100
}
console.log(fetchStatue.success)

//8 神奇 any

let body:any=document.documentElement

//9 null&undefined 是其他类型的子类型 strictNullChecks json 中配置是否看起null的严格检查

function fn(x: number | string) {
    if (typeof x === 'number') {
      // x: number 类型
    } else if (typeof x === 'string') {
      // x: string 类型
    } else {
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
let g:number|string;
g='test'
console.log(g)
//15类型断言 1.可以将一个联合类型断言为其中一个类型，但是不能将其断言为一个不存在的类型
//16字符串、数字、布尔值字面量
type Luck=1|'one'|true
let  h:Luck=1
//字符串字面量vs联合类型 1.字符串字面量只能取具体的某几个字符串，但是联合类型确是其中某几种类型


export {}