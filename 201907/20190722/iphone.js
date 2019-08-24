let http= require('http')

http
.createServer((req,res)=>{
    res.end('iphone users')
}).listen(3005)