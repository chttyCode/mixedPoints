let http = require('http')
let querystring=require('querystring')

const options = {
host: '127.0.0.1',
port: 3003,
};


function down(s,e){
    let req=http.request(options,(res)=>{
        let range=res.headers['content-range']
        let [part,total] = range.split('/')
        let [s,e]=part.split('-')
        console.log(res.headers)
        console.log(res.statusCode)
        res.on('data', (chunk) => {
            console.log(`响应主体: ${chunk}`);
        });
        res.on('end', () => {
            console.log('响应中已无数据');
            if(--e+5<total){
                down(e,e+5)
            }
        });
    })
    req.setHeader('content-type', 'text/html');
    req.setHeader('Content-Range',  `${s}-${e}/20`);
    req.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
    });
    req.end();
}

down(0,4)