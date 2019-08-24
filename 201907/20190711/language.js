let http = require('http')
let url = require('url')
let fs = require('fs')
let path = require('path')
let server = http.createServer((req,res)=>{
    let {pathname} = url.parse(req.url)
    if(pathname == '/index.html'){
        return fs.createReadStream(path.join(__dirname,'index.html')).pipe(res)
    }
    let lan = req.headers['accept-language']

    if(lan){
        let lans=(lan+'').split(',').map(l=>{
            let [lan='zh',q='q=1']=(l+'').split(';')
            return {lan,q:q.split('=')[1]}
        }).sort((a,b)=>b.q-a.q)
        let accept=lans[0] || {}
        if(accept.lan == 'zh-CN'){
            res.statusCode = 302;
            // 浏览器会解析地址 进行跳转 redirect
            res.setHeader('Access-Control-Allow-Origin','*');
            res.setHeader('Location','https://www.baidu.com');
            res.end(); // 重定向
        }else if(accept.lan == 'en'){
            res.statusCode = 302;
            res.setHeader('Access-Control-Allow-Origin','*');
            res.setHeader('Location','http://127.0.0.1:3004');
            res.end(); // 重定向
        }
    }


    if(lan){
        let lans=(lan+'').split(',').map(l=>{
            let [lan='zh',q='1']=(l+'').split(';')
            return {lan,q:q.split('=')[1]}
        }).sort((a,b)=>b.q-a.q)
        let accept=lans[0] || {}
        return res.end(accept.lan)
    }
    res.end('server at 30003')
})
server.listen(3003,()=>{
    console.log('start 3003')
})