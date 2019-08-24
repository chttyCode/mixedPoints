/*
 * @Author: kongds
 * @Date: 2019-08-17 15:04:57
 */
let Koa = require('./koa/application');
// let Koa = require('koa');

let app = new Koa();
app.use(async (ctx,next)=>{
    ctx.body = 'hello';
    await next()
})

app.use(async (ctx,next)=>{
    await new Promise((rsolve,reject)=>{
        setTimeout(()=>{
            rsolve(100)
        },1000)
    })
    ctx.body='1000'
})
// listen 监听端口的
app.listen(3005,function(){
    console.log(`server start 3005`);
})