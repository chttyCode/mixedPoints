let http=require('http')
let fs=require('fs')
let url =require('url')
let path=require('path')
let chalk = require('chalk')
let zlib =require('zlib')
const server = http.createServer((req,res)=>{
    let {pathname}=url.parse(req.url)
    if(pathname == '/favicon.ico')return res.end()
    fs.stat(path.join(__dirname,pathname),(err,stateObj)=>{
        if(err){
            console.log(chalk.red(err))
            return res.end()
        }
        if(stateObj.isDirectory()){
            return res.end()
        }else{
            let referer = req.headers['referer']
            if(referer){
                let host = req.headers['host']
                let {host:refererHost} = url.parse(referer)
                if(host!=refererHost){
                  return   fs.createReadStream(path.join(__dirname,'bad.jpg')).pipe(res)
                }
            }
            let acceptEncoding = req.headers['accept-encoding']
            if(/\bgzip\b/.test(acceptEncoding)){
                res.setHeader('content-encoding','gzip')
                return fs.createReadStream(path.join(__dirname,pathname)).pipe(zlib.createGzip()).pipe(res)
                return fs.createReadStream(path.join(__dirname,pathname)).pipe(res)
            }else if(/\bdeflate\b/.test(acceptEncoding)){
                res.setHeader('content-encoding','deflate')
                return fs.createReadStream(path.join(__dirname,pathname)).pipe(zlib.createDeflate()).pipe(res)
            }
            fs.createReadStream(path.join(__dirname,pathname)).pipe(res)
        }
    })
})
server.listen(3005,()=>{
    console.log(chalk.green('started'))
})