/*
 * @Author: kongds
 * @Date: 2019-08-12 15:12:52
 */

const express = require('./express')
// const express = require('express')
const chalk = require('chalk')
const querystring = require('querystring')
let crypto =require('crypto')
let app = express()
let session = require('express-session');
const secret = 'kds'
// body-parser 第三方
// let bodyParser = require('body-parser');
//let session = require('express-session');

function bodyParser(){

}



function cookieParser(secret){
    return function(req,res,next){
        res.cookie=(key,value,options={})=>{
            let {signed,secret,maxAge,domain,httpOnly,path}=options,cookies=[],cookie
            if(signed){
                let cryptoValue=crypto.createHmac('sha256',secret).update(value).digest('base64').replace(/\+|\//g,'')
                cookie=`${key}=${value}.${cryptoValue}`
                cookies.push(cookie)
                if(maxAge){
                    cookies.push(`max-age=${maxAge}`)
                }
                if(domain){
                    cookies.push(`domain=${domain}`)
                }
                if(httpOnly){
                    cookies.push(`httpOnly=${httpOnly}`)
                }
                if(path){
                    cookies.push(`path=${path}`)
                }
            }else{
                cookie=`${key}=${value}`
                cookies.push(cookie)
            }
            res.setHeader('set-cookie',cookies.join(';'))
        }
        if(req.headers.cookie){
            let cookies=querystring.parse(req.headers.cookie,';')
            if(secret){
                //校验
                let result={}
                for(let [key,value] of Object.entries(cookies)){
                    let [preValue,preCrypto]=value.split('.'),
                    currentCrypto = crypto.createHmac('sha256',secret).update(preValue).digest('base64').replace(/\+|\//g,'')
                    if(currentCrypto === preCrypto){
                        result[key]=preValue
                    }
                }
                //设置值
                req.cookies=result
            }else{
                req.cookies=cookies
            }
        }
        next()
    }
}

bodyParser.json=function(){
    return function(req,res,next){
        if(req.headers['content-type']=== 'application/json'){
            let result=[]
            req.on('data',(data)=>{
                result.push(data)
            })
            req.on('end',(data)=>{
                req.body=JSON.stringify(Buffer.concat(result).toString())
                next()
            })
        }else{
            next();
        }
    }
}

bodyParser.urlencoded=function(){
    return function(req,res,next){
        if(req.headers['context-type'] === 'application/x-www-form-urlencoded'){
            let arr = [];
            req.on('data',function(data){
                arr.push(data);
            })
            req.on('end',function(){
                req.body = require('querystring').parse(Buffer.concat(arr).toString());
                next();
            })
        }else{
            next();
        }
    }
}

app.use(session({
    // 把session 存到redis中....
    resave:false, // 每次是否发放新的名字
    saveUninitialized:true, // 只要客户端连接服务端 就提供一个session 
    secret // 签名的秘钥
})); // 将cookie解析后 放到req属性上

//resful api
app.use(cookieParser(secret))
// app.use(cookieParser())
app.use(bodyParser.json())
app.use('/write',function(req,res,next){
    console.log('~~~~~~~~~~~~');
    next();
    console.log('-------------');
})
app.get('/a',function(req,res){
    res.end('get')
})
app.post('/a',function(req,res){
    res.end('post')
})

app.get('/username/:xid/:xname',function(req,res){
    console.log(req.params.xid,req.params.xname)
    res.end(`${req.params.xid},${req.params.xname}`)
});

app.get('/read',function(req,res){
    console.log(req.cookies)
    res.send(req.session.a);
    // res.send(req.cookies)
})

app.get('/write',function(req,res){
    // res.cookie('name','kds',{signed:true,secret});
    req.session.a = 'hello';
    // res.cookie('name','kds');
    res.send('ok')
})

app.post('/ajax',function(req,res){ 
    console.log(req.body)
    res.send(req.body);
});
// app.all('/',function(req,res){
//     res.end('all')
// })
// app.all('*',function(req,res){
//     res.end('all * ');
// })
app.listen(3004,()=>{
    console.log(chalk.green('express server at 3004'))
})