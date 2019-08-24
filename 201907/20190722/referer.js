let http = require('http')
let chalk = require('chalk')
let fs =require('fs')
let path =require('path')
http.createServer((req,res)=>{
    console.log(req.headers)
    let referer=req.headers['referer']
    console.log(referer)
    if(referer){
        console.log(chalk.green(referer))
    }
    console.log(req.headers['host'])
    fs.createReadStream(path.join(__dirname,'ok.png')).pipe(res)
    
}).listen(3007)