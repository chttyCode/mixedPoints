//创建 a/b/c/d
let fs = require('fs')
let path = require('path')

function createDir(dirpath){
    let dirs=dirpath.split('/'),dir,father=''
    while(dir=dirs.shift()){
        father+=dir+'/'
        try{
            fs.accessSync(path.join(__dirname,father))
        }catch(err){
            fs.mkdirSync(path.join(__dirname,father))
        }
    }
}   
createDir('a/b/c/d')
createDir('a/c/f')
createDir('a/d/e')