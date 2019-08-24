let fs = require('fs')

function writeSteam(source,target){
    let buf = Buffer.alloc(3),ops=0
    fs.open(source,'r',(err,rfd)=>{
        fs.open(target,'w',(err,wfd)=>{
            function next(){
                fs.read(rfd,buf,0,3,ops,(err,datalen)=>{
                    if(datalen){
                        fs.write(wfd,buf,0,3,ops,(err,r)=>{
                            ops+=datalen
                            next()
                        })
                    }else{
                        fs.close(rfd,()=>{console.log('关闭读文件')})
                        fs.close(wfd,()=>{console.log('关闭写文件')})
                    }
                })
            }
            next()
        })
    })
}
writeSteam('name.txt','num.txt')