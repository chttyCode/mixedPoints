//泛型 是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
/**
 * 
 * 多个泛型参数
 * 泛型默认参数 
 */

//1. 泛型函数
//1-1
// function createArray(length: number, value: any): Array<any> {
//     let result: any = [];
//     for (let i = 0; i < length; i++) {
//       result[i] = value;
//     }
//     return result;
//   }
//   let result = createArray(3,'x');
//   console.log(result);
// 1-2
function createArray2<T,B>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i <length; i++) {
        result[i] = value;
    }
    return result;
}
let result2 = createArray2<string,number>(3,'x');
console.log(result2);

//2.泛型类,多个泛型参数
class MyArray<T,B>{
    private list:(T|B)[]=[];
    add(value:B) {
        this.list.push(value);
    }
    getMax():(T|B) {
        let result=this.list[0];
        for (let i=0;i<this.list.length;i++){
            if (this.list[i]>result) {
                result=this.list[i];
            }
        }
        return result;
    }
}
let arr=new MyArray<number,string>();
arr.add(1); arr.add(2); arr.add('2');
let ret = arr.getMax();
console.log(ret);

//3. 泛型接口
interface Calculate{
    <T>(a:T,b:T):T
}
interface Calculate2<T=number>{
    (a:T,b:T):T
}
let add:Calculate = function<T>(a:T,b:T){
return a;
}
let add2:Calculate2= function(a,b){
return 0;
}
add<number>(1,2);

//4.泛型约束 在函数中使用泛型的时候，由于预先并不知道泛型的类型，所以不能随意访问相应类型的属性或方法。
/**
 * 泛型继承的方式约束泛型
 */
function logger<T>(val:T){
    console.log(val.length)
  }
  interfa ce LengthWise{
    length:number
  }
  //可以让泛型继承一个接口
  function logger2<T extends LengthWise>(val:T){
    console.log(val.length)
  }
  logger2(1);
  logger2('kds');

//5 泛型类型别名 泛型类型别名可以表达更复杂的类型
/**
 * 接口是创建新的类型，别名只是对这个类型的引用
 * 类型别名不能被extends和implements
 * 使用联合类型和元组类型的数据别名则更适合
 */
type Cart<T> = {list:T[]} | T[];
let c1:Cart<string> = {list:['1']};
let c2:Cart<number> = [1];


  