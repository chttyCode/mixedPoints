let http = require('http')
let chalk = require('chalk')
let url = require('url')
let fs = require('fs')
let path = require('path')  
http.createServer((req,res)=>{
    let {pathname} = url.parse(req.url)
    if(pathname.includes('index.html')){
        fs.createReadStream(path.join(__dirname,'index.html')).pipe(res)
    }else{
        return res.end()
    }
}).listen(3004,()=>{
    console.log(chalk.green('static server is start at 3004'))
})