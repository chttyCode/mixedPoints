let http = require('http')
let url = require('url')
let fs=require('fs')
let mime = require('mime')
let path = require('path')
const server = http.createServer((req,res)=>{
    let {pathname}=url.parse(req.url)
    if(pathname == '/index.html'){
        res.setHeader('content-type',mime.getType(path.join(__dirname,'index.html'))+';charset=utf8')
        fs.createReadStream(path.join(__dirname,'index.html')).pipe(res)
    }else{  
        res.end('ok2222222222')
    }
})
server.listen(4000,()=>{
    console.log('server')
})