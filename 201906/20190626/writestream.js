let fs = require('fs')
let events = require('events')
class WriteStream extends events{
    constructor(target,options={}){
        super()
        this.target=target
        this.flags=options.flags || 'w';
        this.encoding=options.encoding;
        this.fd=options.fd;
        this.mode=options.mode || 0o666;
        this.autoClose=options.autoClose;
        this.highWaterMark=options.highWaterMark||16*1024
        this.start=options.start || 0;
        this.cache = [];
        this.len = 0;
        this.needDrain = false;
        this.writing = false;
        this.ops = this.start;
        this.open()
    }
    open(){
        fs.open(this.target,this.flags,(err,fd)=>{
            this.fd=fd
            this.emit('open',fd)
        })
    }
    write(chunk,encoding,callback=()=>{}){
        chunk=Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk+'')
        this.len+=chunk.length
        if(this.len>=this.highWaterMark){
            this.needDrain=true
        }
        if(this.writing){
            this.cache.push({
                chunk,
                encoding,
                callback
            })
        }else{
            this.writing=true
            this._write(chunk,encoding,()=>{
                callback()
                this.clearBuffer()
            })
        }
        return !this.needDrain
    }
    clearBuffer(){
        let data=this.cache.shift()
        if(data){
            let {chunk,encoding,callback}=data
            this._write(chunk,encoding,()=>{
                callback()
                this.clearBuffer()
            })
        }else{
            this.writing=false
            if(this.needDrain){
                console.log('drain')
                this.needDrain=false
                this.emit('drain')
            }
        }
    }
    _write(chunk,encoding,callback){
        if(!this.fd){
            return this.once('open',()=>this._write(chunk,encoding,callback))
        }
        fs.write(this.fd,chunk,0,chunk.length,this.ops,(err,byteLen)=>{
            this.len-=byteLen
            this.ops+=byteLen
            callback()
        })
    }
}
module.exports=WriteStream