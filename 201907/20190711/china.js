let http=require('http')

http.createServer((req,res)=>{
    res.end('欢迎来到china官网')
}).listen(3005)