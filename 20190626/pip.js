// 拷贝文件内容 之 pip
let fs = require('fs')
let path = require('path')
let WriteStream= require('./writestream')
let ReadStream = require('./readstream')
// readStream 64k write 16k
let source=path.join(__dirname,'name.txt'),target=path.join(__dirname,'num.txt')

let rs = new ReadStream(source)
let ws = new WriteStream(target)

rs.pipe(ws)
// rs.on('data',(data)=>{
//     ws.write(data)
// })