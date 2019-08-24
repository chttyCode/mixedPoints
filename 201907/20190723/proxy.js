let http=require('http')
let fs=require('fs')
let url =require('url')
let path=require('path')
let chalk = require('chalk')
let zlib =require('zlib')
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
let target={
    '/a':'http://127.0.0.1:3007',
    '/b':'http://127.0.0.1:3008'
}
const server = http.createServer((req,res)=>{
    let {pathname} = url.parse(req.url)
    if('/favicon.ico' == pathname)return res.end()
    proxy.web(req, res, { target: target[pathname] });
}).listen(3006)