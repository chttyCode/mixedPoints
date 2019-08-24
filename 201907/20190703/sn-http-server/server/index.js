const http = require('http');
const path=require('path')
const fs=require('mz/fs')
const mime=require('mime')
const ejs=require('ejs')
const url = require('url');
const template=fs.readFileSync(path.join(__dirname,'..','template/index.html'),'utf8')
class Server {
    constructor(config){
        this.address=config.address
        this.dir=config.dir
        this.template=template
        this.port=config.port
    }
    async handlerResponse(req,res){
        let {pathname}=url.parse(req.url)
        let absPath=path.join(this.dir,pathname)
        let stateObj=await fs.stat(absPath)
        if(stateObj.isDirectory()){
            let dirs=await fs.readdir(absPath)
            let str = ejs.render(this.template,{arrs: dirs.map(dir=>({
                href:path.join(pathname,dir),
                content:dir
            }))});
            res.setHeader('Content-Type','text/html;charset=utf8');
            res.end(str);
        }else{
            res.setHeader('Content-Type', `${mime.getType(absPath)};charset=utf8`);
            fs.createReadStream(absPath).pipe(res)
        }
    }
    start(cb){
        let server=http.createServer(this.handlerResponse.bind(this));
        server.listen(this.port,this.address,cb)
    }
    a= async ()=>{
        let {pathname}=url.parse(req.url)
        let absPath=path.join(this.dir,pathname)
        let stateObj=await fs.stat(absPath)
    }
}
module.exports=Server