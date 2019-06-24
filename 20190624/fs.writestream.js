// 拷贝文件内容
let fs = require('fs')
let path = require('path')

// readStream 64k write 16k
let source=path.join(__dirname,'name.txt'),target=path.join(__dirname,'num.txt')

let ws = fs.createWriteStream(target,{
    flags:'w',
    mode:0o666,
    autoClose:true,
    encoding:'utf8',
    highWaterMark: 2
})

let flag=ws.write('0123456789')
console.log(flag)