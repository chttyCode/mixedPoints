//1-1)
let a=1
let obj = {
    a:2,
    fn:function(){
        console.log(this.a)
    }
}
//1-2)
let obj = {
    a:2,
    fn:function(){
        setTimeout(function(){
            console.log(this.a)
        })
    }
}
//1-3)
let obj = {
    a:2,
    fn:function(){
        setTimeout(()=>{
            console.log(this.a)
        })
    }
}
obj.fn()
//1-1):
//结果：2
//解释：this为点前的调用者

//1-2):
//结果：undefined
//解释：this为window

//1-3):
//结果：2
//解释：this为fn的调用者

//2-1)
let a=1
let obj = {
    a:2,
    fn:()=>{
        console.log(this.a)
    }
}
 
//2-2)
let obj = {
    a:2,
    fn:()=>{
        setTimeout(function(){
            console.log(this.a)
        })
    }
}

//2-3)
let obj = {
    a:2,
    fn:()=>{
        setTimeout(()=>{
            console.log(this.a)
        })
    }
}
obj.fn()
//2-1)
//结果：undefined
//解释：this为window

//2-2)
//结果：undefined
//解释：this为window

//2-3)
//结果：undefined
//解释：this为window