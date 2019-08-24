// 切片式开发=>装饰器
const fs = require('fs')
const path = require('path')
function ajax(){
    fs.readFile(path.join(__dirname,'name.txt'),'utf8',(err,data)=>{
        if(err) throw new Error(err)
        console.log(data)
        return data
    })
}
ajax.before=function(callback){
    return ()=>{
        callback()
        this()
    }
}
//场景 埋点 需求迭代
const newAjax=ajax.before(function(){
    console.log('触发访问埋点')
})
newAjax()