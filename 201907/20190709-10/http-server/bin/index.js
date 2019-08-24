#! /usr/bin/env node
const commander = require('commander')
const json = require('../package.json')
const chalk = require('chalk')
const Server =require('../clserver')
let config = {
    host:'127.0.0.1',
    port:3001,
    dir:process.cwd()
}


commander.version(json.version)
.option('-p, --port <n>' , ' set http-server port')
.option('-h, --host <n>' , ' set http-server host')
.option('-d, --dir <n>' , ' set http-server dir')
.parse(process.argv)
.on('help',()=>{
    console.log(chalk.green('server  -h 127.0.0.1 -p 3001 '))
})

config={...config,...commander}


// server

let sr=new Server(config)
sr.start()
