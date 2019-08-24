let http = require('http')
let chalk = require('chalk')
const server = http.createServer((req,res)=>{
    console.log(req.headers)
    res.statusCode=200
    res.setHeader('Access-Control-Allow-Origin','*'); // 允许某个源来访问我
    res.end('ok111111111')
})
server.listen(3001,()=>{
    console.log(chalk.green('server start at 30001'))
})