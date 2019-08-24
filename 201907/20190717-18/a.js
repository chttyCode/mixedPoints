let http = require('http')

http.createServer((req,res)=>{
    res.setHeader( 'Access-Control-Allow-Origin',"*")
    res.end('welcome to www')
}).listen(3002,()=>{
    console.log('start2')
})