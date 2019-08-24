let http= require('http')

http
.createServer((req,res)=>{
    res.end('android users')
}).listen(3006)