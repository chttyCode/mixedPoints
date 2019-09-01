export const delay  = function(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },ms)
    })
}


// cps 

export const readFile=function(fileName,callback){
    setTimeout(()=>{
        callback(null,'content'+fileName)
    },1000)
}