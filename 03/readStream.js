let events = require('events');
let fs = require('fs')
class ReadStream extends events{
    constructor(file,options={}){
        super()
        /**
         * flags <string> 参阅支持的文件系统标志。默认值: 'r'。
            encoding <string> 默认值: null。
            fd <integer> 默认值: null。
            mode <integer> 默认值: 0o666。
            autoClose <boolean> 默认值: true。
            start <integer>
            end <integer> 默认值: Infinity。
            highWaterMark <integer> 默认值: 64 * 1024。
         */
        this.file=file
        this.flags= options.flags
        this.mode=options.mode || 0o666
        this.start=options.start || 0
        this.end=options.end
        this.encoding=options.encoding
        this.autoClose=options.autoClose
        this.highWaterMark=options.highWaterMark
        this.fd=null
        this.ops=this.start
        this.flow=true
        this.open()
        this.on('newListener',(event, listener)=>{
           if(event == 'data'){
               this.flow=true
               this.read()
           }
        })
    }
    read(){
        if(!this.fd){
              return  this.once('open',this.read)
        }
        let howLen=Math.min(this.highWaterMark,this.end-this.ops),buffer=Buffer.alloc(howLen)
        fs.read(this.fd,buffer,0,buffer.length,this.ops,(err,byteLength)=>{
            if(!byteLength){
                this.flow=null
                return
            }
            this.ops+=byteLength
            this.emit('data',buffer.toString())
            this.flow&&this.read()
        })  
    }
    open(){
        fs.open(this.file,this.flags,(err,fd)=>{
            this.fd=fd
            this.emit('open',fd)
        })
    }
}
module.exports=ReadStream