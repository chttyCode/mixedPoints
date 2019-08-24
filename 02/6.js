let fs = require('fs')
let path = require('path')


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


function * personMsg(){
    let ad = yield read('ad.txt')
    let tel = yield read('tel.txt')
    let result = {'ad.txt':ad,'tel.txt':tel}
    fetchMsg(result)
}
// let it=personMsg()


// let {value:ad} = it.next()
// let {value:tel}= it.next(ad)
// it.next(tel)

// let {value:ad} = it.next()
// ad.then(v=>{
//     let {value,done} = it.next(v)
//     value.then(value=>{
//         it.next(value)
//     })
// })


function co(it){
    return new Promise((resolve,reject)=>{
        function next(val){
            let {value,done} = it.next(val)
            if(done){
                return resolve(value)
            }
            value.then(value=>{
                next(value)
            })
        }
        next()
    })
}

co(personMsg())