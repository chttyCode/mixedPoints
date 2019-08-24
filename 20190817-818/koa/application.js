/*
 * @Author: kongds
 * @Date: 2019-08-17 15:12:02
 */
let http = require('http')
let context = require('./context');
let request = require('./request');
let response = require('./response');
let Stream = require('stream');
class koa {
    constructor(props){
        this.middlewares=[]
        this.context = Object.create(context); // 防止用户直接修改context对象
        this.request = Object.create(request);
        this.response = Object.create(response);
    }
    use(middleware){
        this.middlewares.push(middleware)
    }
    createContext(req,res){
        const context = Object.create(this.context);
        const request = context.request = Object.create(this.request);
        const response = context.response = Object.create(this.response);
        
        context.req = request.req = response.req = req;
        context.res = request.res = response.res = res;
        
        
        context.state = {};
        return context;
    }
    compose(ctx,middlewares){
        let i=-1
        const dispatch=async (index)=>{
            let middleware = middlewares[index]
            if(i>=index)return Promise.reject('multi called next()~~~~');
            i = index;
            if(index>=middlewares.length)return
            return middleware(ctx,()=>dispatch(index+1))
        }
        return dispatch(0)
    }
    handerRequest(req,res){
        let ctx = this.createContext(req,res);
        let p = this.compose(ctx,this.middlewares);
        res.statusCode = 404;
        p.then(value=>{
            let body = ctx.body;
            if(body instanceof Stream){
                res.setHeader('Content-Type','application/octet-stream');
                res.setHeader('Content-Disposition',`attachment; filename=${body.path}`)
                body.pipe(res);
            }else if(typeof body === 'object'){
                res.setHeader('Content-Type','application/json');
                res.end(JSON.stringify(body));
            }else if(body){
                res.end(body);
            }else{
                res.end(`Not Found`);
            }
        }).catch(err=>{
            console.error(err)
            res.end(JSON.stringify(err))
        })
    }
    listen(...arg){
        let server = http.createServer(this.handerRequest.bind(this))
        server.listen(...arg)
    }
}


module.exports = koa