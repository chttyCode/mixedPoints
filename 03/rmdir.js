let path =  require('path')
let fs = require('fs')

//深度先序同步
function deepDelSync(dir){
    let dirs=fs.readdirSync(dir)
    for(let i=0;i<dirs.length;i++){
        let current=dirs[i],dirPath=path.join(dir,current)
        deepDelSync(dirPath)
    }
    fs.rmdirSync(dir)
}
// deepDelSync('a')

// 广度优先同步
function wideDelSync(dir){
    let index=0,dirs=dir.split('/'),current
    while(current=dirs[index++]){
        let fd=fs.statSync(current)
        if(fd.isDirectory()){
            dirs=[...dirs,...fs.readdirSync(current).map(c=>path.join(current,c))]
        }
    }
    let c
    while( c=dirs.pop()){
        let fd=fs.statSync(c)
        if(fd.isDirectory()){
            fs.rmdirSync(c)
        }else{
            fs.unlinkSync(c)
        }
    }
}
// wideDelSync('a')

//深度先序 异步
function deepDelSerial(dir,callback){
    fs.stat(dir,(err,fd)=>{
        if(err)return callback(err)
        if(fd.isDirectory()){
            fs.readdir(dir,(err,dirs)=>{
                let index=0
                function next(index){
                    if(index>=dirs.length)return fs.rmdir(dir,callback)
                    let current=path.join(dir,dirs[index])
                    deepDelSerial(current,()=>next(++index))
                }
                next(index)
            })
        }else{
            fs.unlink(dir,callback)
        }
    })
}
// deepDelSerial('a',()=>{
//     console.log('done')
// })
//广度先序 异步
function deepDelParallel(dir,callback){
    fs.stat(dir,(err,fd)=>{
        if(err)return callback(err)
        if(fd.isDirectory()){
            fs.readdir(dir,(err,dirs)=>{
                let index=0
                if(dirs.length == 0)return fs.rmdir(dir,callback)
                for(let i=0;i<dirs.length;i++){
                    deepDelParallel(path.join(dir,dirs[i]),done)
                }
                function done(){
                    index++
                    if(index==dirs.length){
                        fs.rmdir(dir,callback)
                    }
                }
            })
        }else{
            fs.unlink(dir,callback)
        }
    })
}
deepDelParallel('a',()=>{
    console.log('done')
})