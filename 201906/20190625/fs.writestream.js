// 拷贝文件内容
let fs = require('fs')
let path = require('path')
let WriteStream= require('./writestream')
// readStream 64k write 16k
let source=path.join(__dirname,'name.txt'),target=path.join(__dirname,'num.txt')

// let ws = fs.createWriteStream(target,{ //继承自WriteStream
//     flags:'w',
//     mode:0o666,
//     autoClose:true,
//     highWaterMark: 2
// })

//1.highWaterMark 最高水位线消费的速度
//这种就是超过highWaterMark的直接会写入内存
// let flag=ws.write('0123456789')

// console.log(flag)

//2.边度边写

// let i=9,flag=true 
// function write(){
//     while(i&&flag){
//         flag = ws.write(i--+'') //达到最高水位线就停止读取
//        console.log(flag)
//     }
// }
// write()
// ws.on('drain',()=>{
//     flag=true
//     write()
//     console.log('drain down')
// })

let ws = new WriteStream(target,{
    flags:'w',
    mode:0o666,
    autoClose:true,
    highWaterMark: 2
})

// ws.write(1234)


let i=100,flag=true 
function write(){
    while(i&&flag){
        flag = ws.write(i--+',') //达到最高水位线就停止读取
       console.log(flag)
    }
}
write()
ws.on('open',()=>{
    console.log('文件打开')
})
ws.on('drain',()=>{
    flag=true
    write()
    console.log('drain down')
})