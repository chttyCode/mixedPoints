// 拷贝文件内容
let fs = require('fs')
let path = require('path')

// readStream 64k write 16k
let source=path.join(__dirname,'name.txt'),target=path.join(__dirname,'num.txt')

function copy(s,t,callback){
    fs.open(s,'r',(err,rfd)=>{
        let buffer=Buffer.alloc(3),ops=0
        fs.open(t,'w+',(err,wfd)=>{
            function next(){
                fs.read(rfd,buffer,0,buffer.length,ops,(err,rbyteLen)=>{
                    if(!rbyteLen){
                        fs.close(rfd,callback)
                        fs.close(wfd,callback)
                        return
                    }
                    fs.write(wfd,buffer,0,rbyteLen,ops,(err,wbyteLen)=>{
                        ops+=wbyteLen
                        next()
                    })
                })
            }
            next()
        })
    })
}   
copy(source,target,()=>{
    console.log('拷贝完成')
})