let http = require('http')
let chalk = require('chalk')
let url= require('url')
let fs=require('fs')
let path = require('path')
let mime = require('mime')
const server= http.createServer((req,res)=>{
    let {pathname} = url.parse(req.url)
    if(/.html|.js|.css/.test(pathname)){
        res.setHeader('content-type',mime.getType(path.join(__dirname,pathname))+';charset=utf-8'  )
        return fs.createReadStream(path.join(__dirname,pathname)).pipe(res)
    }else{
        res.end('not found')
    }
})
server.listen(3001,()=>{
    console.log(chalk.green('server start'))
})