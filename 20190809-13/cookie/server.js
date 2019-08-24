/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 14:32:45
 * @LastEditTime: 2019-08-09 17:28:02
 * @LastEditors: Please set LastEditors
 */
let http = require('http')
let chalk = require('chalk')
let url=require('url')
let querystring = require('querystring')
let crypto = require('crypto')
let secret = 'kds'
const server = http.createServer((req,res)=>{
    let {pathname} = url.parse(req.url)
    //设置cookie
    function setCookie(key,value,options={}){
        let cookieArray=[],line;
        if(options.signedCookie){
            let sign = crypto.createHmac('sha256',secret).update(value+'').digest('base64').replace(/\+|\//g,'')
            console.log(sign)
            line=`${key}=${value}.${sign}`
        }else{
            line=`${key}=${value}`
        }
        cookieArray.push(line)
      if(options.maxAge){ // [name='zf','max-age=10']
        cookieArray.push(`max-age=${options.maxAge}`);
        }
        if(options.domain){ // [name='zf','max-age=10']
        cookieArray.push(`domain=${options.domain}`);
        }
        if(options.httpOnly){ // [name='zf','max-age=10']
        cookieArray.push(`httpOnly=${options.httpOnly}`);
        }
        res.setHeader('set-cookie',cookieArray.join(';'))
    }
    function getCookie(key,options={}){
        if(options.signedCookie){
            //获取headers
            let {cookie} = req.headers
            cookie=cookie&&cookie.replace(/\s/g,'') || ''
            let result =  cookie.split(';').reduce((a,b)=>(a={...a,...querystring.parse(b)},a),{})
            let initValue = result[key]
            if( initValue){
                let [value,sign] = initValue.split('.')
                //取出value和sign
                let newSign = crypto.createHmac('sha256',secret).update(value+'').digest('base64').replace(/\+|\//g,'')
                //用去除的value进行加密newSign
                //判断sign与newSign是否相等
                if(sign == newSign){
                    return value    
                }else{
                    return ''
                }
            }else{
                return ''
            }
        }else{
            let {cookie} = req.headers
            if(!cookie)return 'no cookie'
            let result =  cookie.split(';').reduce((a,b)=>(a={...a,... querystring.parse(b)},a),{}).replace(/\+|\//g,'')
            return result[key]
        }
    }
    if(pathname.includes('write')){
        setCookie('name','kds',{
            domain:'a.com',
            path:'/',
            maxAge:Date.now(),
            httpOnly:true,
            signedCookie:true
        })
        return res.end('write is ok')
    }
    if(pathname.includes('read')){
        return res.end(getCookie('name',{signedCookie:true}))
    }
    if(pathname.includes('visit')){
        let visit = getCookie('visit',{signedCookie:true});
        if(visit){
            visit=Number(visit)
            visit++
            setCookie('visit',visit,{signedCookie:true});
            res.end(`${visit} come`);
        }else{
            setCookie('visit',1,{signedCookie:true})
            return res.end('first come')
        }
    }
    res.end()
})  
server.listen(3003,()=>{
    console.log(chalk.green('server is start at 3003'))
})