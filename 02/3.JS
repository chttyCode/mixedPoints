let fs = require('fs')
let path = require('path')


function read(file){
    return fs.readFileSync(path.join(__dirname,file),'utf-8')
}

function fetchMsg(params){
    console.log(params)
    console.log('fetch params')
}


function * personMsg(){
    let ad = yield read('ad.txt')
    let tel = yield read('tel.txt')
    let result = {'ad.txt':ad,'tel.txt':tel}
    fetchMsg(result)
}
let it=personMsg()

let {value:ad} = it.next()
let {value:tel}= it.next(ad)
it.next(tel)