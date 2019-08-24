// 拷贝文件内容
let fs = require('fs')
let path = require('path')

// readStream 64k write 16k
let source=path.join(__dirname,'name.txt'),target=path.join(__dirname,'num.txt')