let http = require('http')
let fs = require('fs')
let path = require('path')
let url=require('url')
const valueMap={
    en:'welcome to www',
    cn:'欢迎来到万维网'
}
const querystring = require('querystring');
let server = http.createServer((req,res)=>{
    let {pathname,query} = url.parse(req.url)
    if(pathname == '/favicon.ico'){
        res.statusCode=404
        return res.end('NOT FOND')
    }
    if(pathname =='/index.html'){
        return fs.createReadStream(path.join(__dirname,pathname)).pipe(res)
    }
    let reqObj=querystring.parse(query)
    let str=reqObj['lan']&&valueMap[reqObj['lan']]
    setTimeout(()=>{
        res.statusCode = 200;
        // 浏览器会解析地址 进行跳转 redirect
        // res.statusCode = 302;
        // // 浏览器会解析地址 进行跳转 redirect
        // res.setHeader('Location','http://127.0.0.1:3002');
        res.end('ok'); // 重定向
    },2000)
})
server.listen(3001,()=>{
    console.log('start')
})