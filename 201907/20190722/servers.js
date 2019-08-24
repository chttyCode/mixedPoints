let http = require('http')
let querystring=require('querystring')
let fs = require('fs')
let path = require('path')
let source=path.join(__dirname,'num.txt')
const server = http.createServer((req,res)=>{
    range=req.headers['content-range']
    let [part,total] = range.split('/')
    let [s,e]=part.split('-')
    fs.open(source,'r',(err,fd)=>{
        let len= e-s+1, buffer=Buffer.alloc(len)
        fs.read(fd,buffer,0,buffer.length,--s,(err,data)=>{
            res.statusCode=206
            res.setHeader('content-type','text/html')
            res.setHeader('connection','keep-alive')
            res.setHeader('content-range',range)
            console.log(buffer.toString())
            res.end(buffer)
        })
    })
})
server.listen(3003)