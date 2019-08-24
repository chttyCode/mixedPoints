let http = require('http')
let chalk = require('chalk')
const server = http.createServer((req,res)=>{
    //接受跨域的需设置指定的域名&设置Access-Control-Allow-Credentials为true
    res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:3004')
    res.setHeader('Access-Control-Allow-Credentials','true')
    res.setHeader('Access-Control-Allow-Headers','Authorization')
    res.setHeader('Access-Control-Allow-Methods','DELETE ')
    res.setHeader('Access-Control-Max-Age',10); // 默认每次都发options ，可以限制发送的频率
    if(req.method === 'OPTIONS'){ // 如果是options请求就结束掉
        return res.end();
    }
    console.log(req.headers)
    res.end('ok')
})  
server.listen(3003,()=>{
    console.log(chalk.green('server is start at 3003'))
})