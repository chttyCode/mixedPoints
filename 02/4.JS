let fs = require('fs')
let path = require('path')


// function read(file){
//     return fs.readFileSync(path.join(__dirname,file),'utf-8')
// }

// function read(file){
//     fs.readFile(path.join(__dirname,file),'utf-8',(err,data)=>{
//        return data
//     })
// }

function read(file){
    return new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname,file),'utf-8',(err,data)=>{
            resolve(data)
         })
    })
}

function fetchMsg(params){
    console.log(params)
    console.log('fetch params')
}


async function personMsg(){
    let ad = await read('ad.txt')
    let tel = await read('tel.txt')
    let result = {'ad.txt':ad,'tel.txt':tel}
    fetchMsg(result)
}
personMsg()