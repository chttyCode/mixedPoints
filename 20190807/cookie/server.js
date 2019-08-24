let http = require('http')
let chalk = require('chalk')
let url=require('url')
let querystring = require('querystring')
const server = http.createServer((req,res)=>{
    let {pathname} = url.parse(req.url)
    let cookieArray=[]
    //设置cookie
    function setCookie(key,value,options={}){
        if(options.signedCookie){

        }else{
            cookieArray.push(`${key}=${value}`)
        }
    }
    function getCookie(key,options={}){
        if(options.signedCookie){

        }else{
            let {cookie} = req.headers
            if(!cookie)return 'no cookie'
            let result =  cookie.split(';').reduce((a,b)=>(a={...a,... querystring.parse(b)},a),{})
            return result[key]
        }
    }
    if(pathname.includes('write')){
        setCookie('name','kds')
        setCookie('age','10')
        res.setHeader('Set-Cookie',cookieArray.join(';'));
        return res.end('write is ok')
    }
    if(pathname.includes('read')){
        return res.end(getCookie('name'))
    }
    res.end()
})  
server.listen(3003,()=>{
    console.log(chalk.green('server is start at 3003'))
})