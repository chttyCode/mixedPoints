let fs = require('fs')
let ReadStream = require('./readStream')
// let r = fs.createReadStream('name.txt',{
let r = new ReadStream('name.txt',{
    flags :'r',
    // encoding:'utf8',
    mode:0o666,
    autoClose :true,
    start:0,
    end:7,
    highWaterMark :3,
})

r.on('open',(data)=>{
    console.log(data)
    console.log('打开文件')
})
r.on('data',(data)=>{
    // console.log(data.toString())
    console.log(data.length)
})