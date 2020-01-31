//接口
/**
 * 1.接口一方面可以在面向对象编程中表示为行为的抽象，另外可以用来描述对象的形状
 * 2. 接口就是把一些类中共有的属性和方法抽象出来,可以用来约束实现此接口的类
 * 3. 一个类可以继承另一个类并实现多个接口
 * 4. 接口像插件一样是用来增强类的，而抽象类是具体类的抽象概念
 * 修饰词：
 * ?可选属性
 * readonly 只读属性
 * [propName:string]:any,propName名字是任意的
 */

 //1. 接口可以用来描述`对象的形状`,少属性或者多属性都会报错
 interface Speakable{
    speak():void;
    name?:string;//？表示可选属性
  }
  
  let speakman:Speakable = {
    name:'a',
    speak(){}
  }
//2.接口可以在面向对象编程中表示为行为的抽象
interface Speakable{
    speak():void;
}
interface Eatable{
    eat():void
}
class Person implements Speakable,Eatable{
    speak(){
        console.log('Person5说话');
    }
    eat(){}
}
class TangDuck implements Speakable{
    speak(){
        console.log('TangDuck说话');
    }
    eat(){}
}
//3. 接口可以继承
interface Speakable{
    speak():void
  }
interface SpeakChinese extends Speakable{
    speakChinese():void
}
//接口定义函数 对函数的入参和返回值进行约束 1. 函数声明 function 2.函数表达式
interface discount{
    (price:number):number
  }
    //函数表达式
    let cost:discount = function(price:number):number{
        return price * .8;
    }
    //函数声明
    function discount(price:number):number{
        return price * .8;
    }
//4.可索引接口 对数组和对象进行约束
interface UserInterface {
    [index:number]:string
}
interface UserInterface2 {
    [index:string]:string
}
//5.类接口
interface dogInterface{
    name:string;
    speak(words:string):void
}
class Dog implements dogInterface{
    name:string;
    constructor(name:string){
        this.name=name
    }
    speak(words:string){
    console.log(words);
    }
}
//6.构造函数的类型 如何约定一个类的构造函数
class Animal{
    constructor(public name:string){
    }
  }
interface WithNameClass{
    new(name:string):Animal
}
function createAnimal(clazz:WithNameClass,name:string){
    return new clazz(name);
}
let a = createAnimal(Animal,'zhufeng');
console.log(a.name);
export {}