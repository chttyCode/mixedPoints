let http=require('http')
let fs=require('fs')
let url =require('url')
let path=require('path')
let chalk = require('chalk')
let zlib =require('zlib')
const server = http.createServer((req,res)=>{
    res.end('welcome 3007')
}).listen(3007)