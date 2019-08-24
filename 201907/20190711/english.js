let http=require('http')

http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.end('欢迎来到english官网')
}).listen(3004)