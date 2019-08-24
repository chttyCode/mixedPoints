/*
 * @Description: In User Setting
 * @Author: your name
 * @Date: 2019-08-09 17:30:28
 * @LastEditTime: 2019-08-12 15:07:43
 * @LastEditors: Please set LastEditors
 */
let http = require('http')
let chalk = require('chalk')
let querystring = require('querystring')
let uuid =require('uuid')
const CARD_ID='connect.sid'
const seession={}
//seession
//  sessionId
http.createServer((req,res)=>{
    if(req.url.includes('.ico'))return res.end()
    let cookies=querystring.parse(req.headers.cookie,';')
    let connect_id=cookies[CARD_ID]
    if(connect_id){
        let number = Number(seession[connect_id]) 
        number-=10
        seession[connect_id]=number
        res.setHeader('Content-Type','text/plain;charset=utf8')
        res.end(`您的余额${number}`)
    }else{
        let connect_id = uuid.v4()
        res.setHeader('Set-Cookie',`${CARD_ID}=${connect_id}`)
        seession[connect_id]=10000
        res.end('welcome first ')
    }
}).listen(3003,()=>{
    console.log(chalk.green('server is start at 3003'))
})