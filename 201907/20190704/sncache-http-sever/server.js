const http=require('http')
const url=require('url')
const path =require('path')
const fs=require('mz/fs')
const chalk=require('chalk')
const mime=require('mime')
const ejs=require('ejs')
const template = fs.readFileSync(path.join(__dirname,'index.html'),'utf8')
class Server{
    constructor(config){
        this.host=config.host
        this.port=config.port
        this.dir=config.dir
        this.template=template
    }
    async handerResponse(req,res){
        //解析请求路径
        let {pathname} = url.parse(req.url)
        let abspath=path.join(this.dir,pathname)
        try{
            let stateObj= await fs.stat(abspath)
            if(stateObj.isDirectory()){
                //目录
                let dirs=await fs.readdir(abspath),
                 str=ejs.render(this.template,{dirs:dirs.map(d => {
                      let obj={}
                      obj.href=path.join(pathname,d)
                      obj.content=d
                        return obj
                    })
                })
                res.end(str)
            }else{
                //文件
                this.sendFile(req,res,stateObj,abspath)
            }
        }catch(err){
            console.log(chalk.red(err))
            this.sendError(req,res,abspath,err)
        }
    }
    cache(req,res,statObj,absPath){
        let lastModified = statObj.ctime.toUTCString()
        let modifiedSince = req.headers['if-modified-since'];
        let etag = statObj.size+'';
        let noneMatch = req.headers['if-none-match'];
        res.setHeader('Cache-Control','max-age=100000');
        res.setHeader('Last-Modified',lastModified);
        res.setHeader('Etag',etag);

        if(lastModified !== modifiedSince){
            return false;
        }
        if(noneMatch !== etag){
            return false;
        }
        return true
    }
    sendFile(req,res,stateObj,abspath){
        //缓存策略
        res.setHeader('Content-Type',mime.getType(abspath)+';charset=utf8')
        res.setHeader('Cache-Control','max-age=315360000');
        res.setHeader('Expires', new Date(Date.now() + 30000 * 1000).toUTCString());
        fs.createReadStream(abspath).pipe(res)
    }
    sendError(req,res,abspath,err){
        res.statusCode = 404;
        res.end(JSON.stringify(err))
    }
    start(cb){
        let server=http.createServer(this.handerResponse.bind(this))
        console.log(this.port)
        server.listen(this.port,cb)
    } 

}
module.exports=Server