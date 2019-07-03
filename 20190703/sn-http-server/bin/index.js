#! /usr/bin/env node

let commander = require('commander');
let Server = require('../server')
let chalk = require('chalk')
// // 自定义配置项

let config = {
    port:3001,
    address:'127.0.0.1',
    dir:process.cwd()
}
let json = require('../package.json')

commander
  .version(json.version)
  .option('-p, --port <n>', 'Port to use [8080]')
  .option('-a, --address <n>', ' Address to use [0.0.0.0]')
  .option('-d, --dir <n>', ' Show directory listings [true]')
  .action(function (dir, cmd) {
    console.log( 'usage: http-server [path] [options]')
  })
  .parse(process.argv);

//解析命令行参数

config=Object.assign(config,commander)

let server=new Server(config)

server.start(()=>{
    console.log(`${chalk.green(config.address)}:${chalk.green(config.port)}\r\n cwd:${chalk.green(config.dir)}`)
})