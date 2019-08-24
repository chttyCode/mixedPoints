const chalk =require("chalk")
const path = require('path')
const http =  require('http')
const url=require('url')//解析请求路径
const mime= require('mime')
const fs = require('mz/fs')
const ejs =require('ejs')
const crypto = require('crypto');
const zlib = require('zlib')
let template=fs.readFileSync(path.join(__dirname,'./index.html'),'utf8')
let iconType={
    'css':'css',
    'js':'js',
    'html':'html',
    'json':'json',
    'md':'md',
    'tsx':'tsx',
    'txt':'txt'
}
class Server {
    constructor(config){
        this.host=config.host
        this.dir=config.dir
        this.port=config.port
        this.template=template
    }
    async handlerResponse(req,res){
        let {pathname} =url.parse(req.url)
        let absPath=path.join(this.dir,pathname)
        try{
            let stateObj =await fs.stat(absPath)
            if(stateObj.isDirectory()){
                let dirs  =  await fs.readdir(absPath)
                let str=ejs.render(this.template,{data:dirs.map(d=>{
                    let type = (path.join(pathname,d)+'').replace(/\.(.*)$/)
                    type=RegExp.$1
                    type=iconType[type] || "file"
                    return {href:path.join(pathname,d),content:d,type}
                })})
                res.end(str)
            }else{
                this.sendFile(req,res,stateObj,absPath)
            }
        }catch(err){
            res.end(err+'')
        }
    }
    cache(req,res,stateObj,absPath){
        //强制缓存
        res.setHeader('Cache-Control','max-age=10000')
        //etag
        let lastModified = stateObj.ctime.toUTCString()
        let modifiedSince = req.headers['if-modified-since'];
        let etag = stateObj.size+'';
        let noneMatch = req.headers['if-none-match'];
        res.setHeader('Last-Modified',lastModified);
        res.setHeader('Etag',etag);
        //modified
        if( etag == noneMatch || lastModified == modifiedSince){
            return true
        }
    }
    sendFile(req,res,stateObj,absPath){
        res.setHeader('content-type',mime.getType(absPath)+";charset=utf8")
        if(this.cache(req,res,stateObj,absPath)){
            res.statusCode=304
            return res.end()
        }
        let encoding = req.headers['accept-encoding'];
        // 启用压缩
        if(encoding){
            if(/\bgzip\b/.test(encoding)){
                res.setHeader('content-encoding','gzip')
                return fs.createReadStream(absPath).pipe(zlib.createGzip()).pipe(res)
            }
            if(/\bdeflate\b/.test(encoding)){
                res.setHeader('content-encoding','deflate')
                return fs.createReadStream(absPath).pipe(zlib.createDeflate()).pipe(res)
            }
        }
        return fs.createReadStream(absPath).pipe(res)
        //缓存
            //强制缓存 通过地址栏不走强制缓存
            //etag
        const md5 = crypto.createHash('md5');
        // res.setHeader('last-modified',stateObj.ctime.toUTCString())
        // let client = req.headers['if-modified-since']
        // if(client == stateObj.ctime.toUTCString()){
        //     res.statusCode=304
        //     return res.end()
        // }
        // res.setHeader('Cache-Control','max-age=315360000')
            //协商缓存
            //Etag
            //
        let rs=fs.createReadStream(absPath),arr=[]
        rs.on('data',(chunk)=>{
            md5.update(chunk)
            arr.push(chunk)
        })
        rs.on('end',()=>{
            let serverMd5=md5.digest('base64').replace(/\+|\s|\=/g,'')
            let clientMd5=req.headers['if-none-match']
            res.setHeader('etag',serverMd5)
            if(serverMd5 == clientMd5){
                res.statusCode=304
                return res.end()
            }
            res.end(Buffer.concat(arr))
        })

    }
    start(){
        let server= http.createServer(this.handlerResponse.bind(this))
        server.listen(this.port,()=>{
            console.log(chalk.green(`${this.host}:${this.port}`))
        })
    }
}
module.exports=Server