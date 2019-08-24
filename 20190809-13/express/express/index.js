/*
 * @Author: kongds
 * @Date: 2019-08-12 15:48:24
 */
let http = require('http')
let url = require('url');
let crypto=require('crypto')
// 请求方法
let methods = require('methods');
methods.forEach(m=>(m.toLowerCase(),m))
function express(){
    let app=(req,res)=>{
        let {pathname} = url.parse(req.url),routers=app.routers || [],method = req.method.toLowerCase()
        if(pathname.includes('.ico'))return res.end()
        let index=0
        function next(err){
            //判断是中间件还是路由
            if(index > routers.length){
                if(err){
                    return res.send(err); // 如果没有捕获 会将错误打印出来
                }
                return res.end(`Cannot ${method} ${pathname} `)
            };
            let router = routers[index++] || {} 

            if(err){//err find 处理错误的中间件
                if(router.method === 'middle' && router.callback.length === 4){
                    return router.callback.call(app,err,req,res,next)
                }else{next(err)}
            }else{
                if(router.method === "middle"){
                    if(router.path === "/" || pathname ===router.path || pathname.startsWith(`${router.path}/`)){}
                    router.callback.call(app,req,res,next)
                }else{
                    //路由逻辑
                    let {path,callback,method:curmethod} = router||{}
                    if(path.paramKey){//with  placeholder path
                        if( path.test(pathname) &&  (curmethod === method || curmethod =="all")){
                            let [,...arg] = pathname.match(path)
                            let params=path.paramKey.reduce((a,b,i)=>(a[b]=arg[i],a),{})
                            req.params=params
                            return callback.call(app,req,res)
                        }
                    }
                    if(  (path === pathname || path === "*" )&&  (curmethod === method || curmethod =="all") ){
                        return callback.call(app,req,res)
                    }
                    next()
                }
            }
        }
        next()
        // for(let router of routers){
        //     let {path,callback,method:curmethod} = router||{}
        //     if(path.paramKey){//with  placeholder path
        //         if( path.test(pathname) &&  (curmethod === method || curmethod =="all")){
        //             let [,...arg] = pathname.match(path)
        //             let params=path.paramKey.reduce((a,b,i)=>(a[b]=arg[i],a),{})
        //             req.params=params
        //             return callback.call(app,req,res)
        //         }
        //     }
        //     if(  (path === pathname || path === "*" )&&  (curmethod === method || curmethod =="all") ){
        //         return callback.call(app,req,res)
        //     }
        // }
    }
    app.listen=(...arg)=>{
        let server = http.createServer(app)
        server.listen(...arg)
    }
    app.routers=[];
    app.use=(path,callback)=>{
        if(typeof callback == 'undefined'){
            callback = path;
            path = '/'
        }
        let param={
            method:'middle',
            path,
            callback
        }
        app.routers.push(param)
    }
    [...methods,'all'].forEach(method=>{
        app[method]=(path,callback)=>{
            if(/\:/g.test(path)){// with  placeholder path
                // /username/:xid/:xname => /username/:xid/:xname
                let paramKey=[]
                path=path.replace(/\:([^\/]+)/g,(...arg)=>{
                    paramKey.push(arg[1])
                    return '([^\/]+)'
                })
                path=new RegExp(path)
                path.paramKey=paramKey
            }
            let param={
                method,
                path,
                callback
            }
            app.routers.push(param)
        }
    })

    // express内置的中间件 可以实现封装一些公共方法和属性
    app.use(function(req,res,next){
        let {pathname,query} = url.parse(req.url)
        req.path = pathname;
        req.query = query;
        res.sendFile=(p,options)=>{
            let abs = require('path').join(options.root,p)
            let fs = require('fs')
            let mime = require('mime')
            //mime
            res.setHeader('Content-Type',`${mime.getType(abs)};charset=utf-8`);
            fs.createReadStream(abs).pipe(res);
        }
        res.send=(value)=>{
            if(Buffer.isBuffer(value) || typeof value == 'string'){
                res.setHeader('Content-Type','text/html;charset=utf-8');
                return res.end(value);
            }
            if(typeof value === 'object'){
                res.setHeader('Content-Type','application/json;charset=utf-8');
                res.end(JSON.stringify(value));
            }
            if(typeof value === 'number'){
                res.statusCode = value;
                res.end(require('_http_server').STATUS_CODES[value]);
            }
            return res.end('can not parse')
        }
        next()
    })
    return app
} 
express.static=function(dirname){
    return function(req,res,next){
        let fs = require('fs')
        let path = require('path')
        let currentPath = path.join(dirname,req.path)
        fs.stat(currentPath,(err,stateObj)=>{
            if(err)return next(err)
            if(stateObj.isFile()){
                fs.createReadStream(current).pipe(res);
            }
        })
    }
}
module.exports=express


