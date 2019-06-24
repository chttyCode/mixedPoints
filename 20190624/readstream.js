// 拷贝文件内容
let fs = require('fs')
let path = require('path')
let events = require('events')
// readStream 64k write 16k
class ReadStream extends events{
    constructor(file,options={}){
        super()
        this.file=file
        this.flags= options.flags||'r';
        this.encoding=options.encoding;
        this.fd=options.fd;
        this.mode=options.mode||0o666;
        this.autoClose=options.autoClose || true;
        this.start=options.start || 0;
        this.end=options.end;
        this.ops=this.start;
        this.flowing=null
        this.highWaterMark=options.highWaterMark || 64 * 1024
        this.open()
        this.on('newListener', (event, listener) =>{
            console.log(event)
            if(event=='data'){
                this.flowing=true
                this.read()
            }
        })
    }
    read(){
        if(!this.fd){
            return this.once('open',this.read)
        }
        // let howLenToRead= Math.min(this.end?(this.end-this.ops):this.highWaterMar,this.highWaterMar)
        let howLenToRead = this.end? Math.min((this.end-this.pos+1),this.highWaterMark):this.highWaterMark;
        let buffer = Buffer.alloc(howLenToRead)
        fs.read(this.fd,buffer,0,buffer.length,this.ops,(err,byteLen)=>{
            if(!byteLen){
                this.ops=0;
                this.flowing=null
                this.emit('end');
                if(this.autoClose){
                    fs.close(this.fd,()=>{ // 关闭文件 触发close事件
                         this.emit('close');
                    });
                }
                return
            }
            this.ops+=byteLen
            this.emit('data',this.encoding?buffer.slice(0,byteLen).toString(this.encoding):buffer.slice(0,byteLen))
            if(this.flowing){
                this.read()
            }
        })
    }
    open(){
        return fs.open(this.file,this.flags,(err,fd)=>{
            if(err)return ()=>this.emit('error',err)
            this.fd=fd
            this.emit('open',fd)
        })
    }
    // resume
    resume(){
        this.flowing=true
        this.read()
    }
    // pause
    pause(){
        this.flowing=false
    }
}

module.exports=ReadStream