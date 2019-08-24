let http = require('http')
let chalk = require('chalk')

http.createServer((req,res)=>{
    let agent = req.headers['user-agent']
    if(/iPhone/g.test(agent)){
        res.statusCode=302
        res.setHeader('location','http://127.0.0.1:3005')
    }else if(/Android/g.test(agent)){
        res.statusCode=302
        res.setHeader('location','http://127.0.0.1:3006')
    }
    res.end()
}).listen(3004,()=>{
    console.log(chalk.green('start'))
})