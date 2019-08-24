#! /usr/bin/env node

let commander=require('commander')
let chalk=require('chalk')
let json=require('../package.json')
let Server=require('../server')
//自定义默认配置

let config = {
    port:"3005",
    dir:process.cwd(),
    host:'127.0.0.1'
}

//接受命令行参数

commander.version(json.version)
.option('-p, --port <n>','set http-server port')
.option('-d, --dir <n>','set http-server dir')
.option('-h, --host <n>','set http-server host')
.parse(process.argv)

config={...config,...commander}

let sr=new Server(config)
sr.start(()=>{
    console.log(chalk.green('启动服务'))
})


