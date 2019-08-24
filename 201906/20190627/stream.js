let {Writable,Readable,Duplex,Transform}=require('stream'),
path =require('path'),
fs=require('fs'),
util=require('util')

let source=path.join(__dirname,'name.txt'),target=path.join(__dirname,'num.txt')
 

class MyReadable extends Readable{
    constructor(){
        super()
        this.index=5
    }
    _read(){
        if(this.index-- == 0){
            return this.push(null); // 读取完毕后 放一个null
        }
        this.push(this.index+'');
    }
}
let myreadable=new MyReadable()

myreadable.on('data',chunk=>{
    console.log(chunk)
})


class MyWriteStream extends Writable{
    _write(chunk,encoding,clearBuffer){
        fs.appendFile(target,chunk,()=>{
            setTimeout(()=>{
                clearBuffer();
            },1000);
        });
    }
}
let ws = new MyWriteStream();
ws.write('1');
ws.write('2');

util.inherits(Duplex,Readable)
class MyDuplex extends Duplex{
    _read(){
        console.log('read')
    }
    _write(chunk){
        console.log(chunk)
    }
}
let md = new MyDuplex();
md.on('data',()=>{

})
md.write('1');

class MyTransform extends Transform{
    _transform(chunk,encoding,callback){
        this.push(chunk.toString().toUpperCase());
        callback();
    }
}
let myTransform = new MyTransform();
process.stdin.pipe(myTransform).pipe(process.stdout);
process.stdout.write('xxx');
process.stdin.on('data',(chunk)=>{
    console.log(chunk)
})