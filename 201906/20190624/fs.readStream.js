// 拷贝文件内容
let fs = require('fs')
let path = require('path')
let ReadStream= require('./readstream')
// readStream 64k write 16k
let source=path.join(__dirname,'name.txt'),target=path.join(__dirname,'num.txt')


// let  r = fs.createReadStream(source,{
//     highWaterMark:3,

// })
let r= new ReadStream(source,{highWaterMark:3})
// open
r.on('open',(data)=>{
    console.log(data)
})
// close
r.on('close',(data)=>{
    console.log('关闭')
})
// data
r.on('data',(data)=>{
    console.log(data)
    // r.pause()
})
// resume
// pause
// error
r.on('error',(err)=>{
    console.log(err)
})
// end
r.on('end',(data)=>{
    console.log('end')
})